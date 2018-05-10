'use strict';

const express = require('express');

const doquery = require('../../../config/postgresql');

const router = express.Router();

router.get('/all', (req, res) => {
  let result = doquery('select * from users');
  result
    .then(input => {
      res.json({
        data: input.rows,
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err,
      });
    });
});

router.post('/insert', (req, res) => {
  if (!req.body.student_id && !req.body.student_name) {
    res.json({
      error: 'student_id or student_name cannot be empty',
    });
  }

  let { student_id, student_name } = req.body;

  let result = doquery(
    'insert into users (studint_id, student_name) values ($1, $2) RETURNING *',
    [student_id, student_name],
  );
  result
    .then(input => {
      res.json({
        data: input.rows[0],
      });
    })
    .catch(err => {
      console.log(err);
      res.send('error');
    });
});

module.exports = router;
