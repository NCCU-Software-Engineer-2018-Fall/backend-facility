'use strict';

const express = require('express');

const { doquery } = require('../../../config/postgresql');

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
  if (!req.body.studentId && !req.body.studentName) {
    res.json({
      status: 'failed',
      error: 'student_id or student_name cannot be empty',
    });
  }

  let { studentId, studentName } = req.body;

  let result = doquery(
    'insert into users (student_id, student_name) values ($1, $2) RETURNING *',
    [studentId, studentName],
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

router.get('/queryById/:id', (req, res) => {
  if (req.params.id) {
    let query = 'select * from users where id in ($1)';
    let result = doquery(query, [req.params.id]);
    result
      .then(input => {
        res.json({
          status: 'success',
          data: input.rows[0],
        });
      })
      .catch(err => {
        res.json({
          status: 'error',
          error: err,
        });
      });
  } else {
    res.json({
      status: 'failed',
      error: 'id cannot be null',
    });
  }
});

router.get('/queryByStudentId/:studentId', (req, res) => {
  if (req.params.studentId) {
    let query = 'select * from users where student_id in ($1)';
    let result = doquery(query, [req.params.studentId]);
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
  } else {
    res.json({
      status: 'failed',
      error: 'studentId cannot be null',
    });
  }
});

module.exports = router;
