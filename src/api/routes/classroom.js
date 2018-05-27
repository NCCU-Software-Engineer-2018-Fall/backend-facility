'use strict';

const express = require('express');

const { doquery } = require('../../../config/postgresql');

const router = express.Router();

router.get('/all', (req, res) => {
  let result = doquery('select * from classroom');
  result
    .then(input => {
      res.json({
        data: input.rows,
      });
    })
    .catch(err => {
      res.json({
        status: 'failed',
        error: err,
      });
    });
});

router.post('/insert', (req, res) => {
  if (!req.body.classroomName) {
    res.json({
      error: 'classroomName cannot be empty',
    });
  }

  let { classroomName } = req.body;

  let result = doquery(
    'insert into classroom (classroom_name) VALUES ($1) returning *',
    [classroomName],
  );
  result
    .then(input => {
      res.json({
        status: 'success',
        data: input.rows[0],
      });
    })
    .catch(err => {
      res.json({
        status: 'failed',
        error: err,
      });
    });
});

module.exports = router;
