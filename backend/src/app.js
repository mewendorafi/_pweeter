require('dotenv').config();
const cors = require('cors');
require('./database/connection');
const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const indexRouter = require('./routes/index');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

module.exports = app;
