'use strict';

const express = require('express');

const doquery = require('../../../config/postgresql');

const router = express.Router();

router.get('/all', (req, res) => {
  let result = doquery('select * from appointment');
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
  let { userId, classroomId, periodId, reservedDate } = req.body;

  if (!userId && !classroomId && !periodId && !reservedDate) {
    res.json({
      status: 'failed',
      error: 'userId or classroomId or periodId or reservedDate cannot be null',
    });
  }

  let input = [userId, classroomId, periodId, reservedDate];

  let insertQuery =
    'insert into appointment (user_id, classroom_id, period_id, reserved_date) values ($1, $2, $3, $4) returning *;';

  let result = doquery(insertQuery, input);
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
