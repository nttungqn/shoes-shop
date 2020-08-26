/** @format */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/AppError');

const app = express();

// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', viewRouter);
app.use('/api/products/', productRouter);
app.use('/api/users/', userRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
