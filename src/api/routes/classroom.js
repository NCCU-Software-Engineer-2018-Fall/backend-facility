'use strict';

const express = require('express');

const doquery = require('../../../config/postgresql');

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
      console.log(err);
      res.json({
        error: err,
      });
    });
});

router.post('/insert', (req, res) => {
  if (!req.body.classroom_name) {
    res.json({
      error: 'classroom_name cannot be empty',
    });
  }

  let { classroom_name } = req.body;

  let result = doquery(
    'insert into classroom (classroom_name) VALUES ($1) returning *',
    [classroom_name],
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
