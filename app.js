// Require Necessary Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cokieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// Import Custom Middleware
const handler404 = require('./middleware/404Handler');
const errorHandler = require('./middleware/errorHandler');
const handler500 = require('./middleware/500Handler');

/* 
***
const v1 = require("./routes/v1"); 
***
*/

const app = express();

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cokieParser());
app.use(logger('dev'));

/*
*** 
app.use('/api/v1', v1); 
***
*/

app.use(handler404);
app.use(errorHandler);
app.use(handler500);

module.exports = app;