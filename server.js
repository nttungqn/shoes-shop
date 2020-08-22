/** @format */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then((con) => {
		console.log('DB connection successfull');
	});

const app = require('./app.js');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`App running on ${port}...`);
});
