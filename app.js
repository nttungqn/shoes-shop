/** @format */

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const shoesRouter = require('./routes/shoesRoutes');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/shoes/', shoesRouter);
app.use('/api/users/', userRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
