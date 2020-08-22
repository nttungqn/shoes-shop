/** @format */

const express = require('express');
const userRouter = require('./routes/userRoutes');
const shoesRouter = require('./routes/shoesRoutes');

const app = express();

app.use('/api/users', userRouter);
app.use('/api/shoes/', shoesRouter);

module.exports = app;
