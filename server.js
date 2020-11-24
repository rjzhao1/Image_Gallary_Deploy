const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// Routers for backend logics
const imageRouter = require('./routes/api/image');
app.use('/api/image', imageRouter);

if (process.env.NODE_ENV == 'production') {
	app.use('/', express.static(path.join(__dirname, '/client/build')));

	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
	});
}

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
