const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
	{
		image_url: { type: String, required: true },
		name: { type: String, required: true },
		flagged: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
