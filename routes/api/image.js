const router = require('express').Router();
let Image = require('../../models/image.model');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const uuid = require('uuid');
const bucket_cred = require('../../image-gallary-291507-bd42f1c4f5d5');

// Connect to Google Cloud Storage
const gc = new Storage({
	keyFilename: path.join(__dirname, '../../image-gallary-291507-bd42f1c4f5d5'),
	projectId: bucket_cred.project_id,
});

const imageGallaryBucket = gc.bucket(process.env.GC_BUCKETNAME);

// Process file uploaded from client
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(new Error('jpeg or png files only'), false);
	}
};

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: fileFilter,
});

// API endpoints
router.route('/').get((req, res) => {
	Image.find()
		.then((images) => res.json(images))
		.catch((err) => res.status(400).json('Error' + err));
});

router.route('/add').post(upload.single('newImage'), (req, res) => {
	const origfilename = req.file.originalname;
	const filename = uuid.v1() + '-' + req.file.originalname;
	const uploadFile = imageGallaryBucket.file(filename);
	const uploadFileStream = uploadFile.createWriteStream();

	uploadFileStream.on('error', (err) => console.log(err));
	uploadFileStream.on('finish', () => {
		const image_url = `https://storage.googleapis.com/image-gallary/${uploadFile.name}`;
		const newImage = new Image({
			image_url,
			name: origfilename,
		});

		newImage
			.save()
			.then((result) => res.json(result))
			.catch((err) => res.status(400).json('Error' + err));
	});

	uploadFileStream.end(req.file.buffer);
});

router.route('/toggleFlag/:id').post((req, res) => {
	const image_url = req.body.image_url;
	Image.findById(req.params.id)
		.then((image) => {
			image.flagged = !image.flagged;
			image
				.save()
				.then(res.json(image))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
