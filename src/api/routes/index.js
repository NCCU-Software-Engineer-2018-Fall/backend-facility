'use strict';

const express = require('express');
// const doquery = require('../../../config/db');

const doquery = require('../../../config/postgresql');

const router = express.Router();

// router.get('/users', (req, res) => {
//   const todo = doquery('select * from `users`');
//   todo
//     .then(input => {
//       console.log(input);
//       input.map((v, i) => {
//         console.log(i, v);
//       });
//       res.json({
//         data: input,
//       });
//     })
//     .catch(err => {
//       console.log('message', err);
//     });
// });

// router.get('/classrooms', (req, res) => {
//   const todo = doquery('select * from `classroom`');
//   todo
//     .then(input => {
//       console.log(input);
//       res.json({
//         data: input,
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

router.get('/wtf', (req, res) => {
  var result = doquery('select NOW()');
  result
    .then(input => {
      console.log(input);
      res.json({
        data: input.rows[0],
      });
    })
    .catch(err => {
      console.log(err);
      res.send('wtf');
    });
});

module.exports = router;
