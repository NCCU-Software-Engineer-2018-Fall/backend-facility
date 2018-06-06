'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index.js');
const user = require('./routes/user.js');
const period = require('./routes/period.js');
const appointment = require('./routes/appointment.js');
const classroom = require('./routes/classroom.js');
const batch = require('./routes/batch.js');

const app = express();

/**** server configuration ****/

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

app.use('/', routes); // testing && TODO: signin
app.use('/user', user);
app.use('/classroom', classroom);
app.use('/period', period);
app.use('/appointment', appointment);
app.use('/batch', batch);

/**** error handlers ****/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

app.listen(9000);

module.exports = app;
