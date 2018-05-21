'use strict';

const express = require('express');
const moment = require('moment-timezone');
var md5 = require('md5');

const { doquery, client } = require('../../../config/postgresql');

const Router = require('express-promise-router');
const router = new Router();

function randomDate() {
  let max = 30;
  let min = 0;
  let toAdd = Math.floor(Math.random() * (max - min) + min);
  return moment('2018-05-01')
    .add(toAdd, 'days')
    .format('YYYY MM DD');
}

router.get('/all', (req, res) => {
  let query = `select *, c.id as classroom_id, p.id as period_id, u.id as user_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id`;

  let result = doquery(query);
  result
    .then(input => {
      res.json({
        status: 'success',
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

// router.post('/insert', (req, res) => {
//   let { userId, classroomId, periodId, reservedDate } = req.body;

//   if (!userId && !classroomId && !periodId && !reservedDate) {
//     res.json({
//       status: 'failed',
//       error: 'userId or classroomId or periodId or reservedDate cannot be null',
//     });
//   }

//   let input = [userId, classroomId, periodId, reservedDate];

//   let insertQuery =
//     'insert into appointment (user_id, classroom_id, period_id, reserved_date) values ($1, $2, $3, $4) returning *;';

//   let result = doquery(insertQuery, input);
//   result
//     .then(input => {
//       res.json({
//         status: 'success',
//         data: input.rows[0],
//       });
//     })
//     .catch(err => {
//       res.json({
//         status: 'failed',
//         error: err,
//       });
//     });
// });

router.get('/test', async (req, res) => {
  // let period_id = '7318648c-0c88-4637-b17b-bcafa136a597'; // symbol: E
  // let period_id = 'fa132f26-94da-4b98-aac3-15138adbb9ef'; // symbol: F
  // let user_id = '2660d148-a3bc-464f-8238-aefe4197326c';
  // let classroom_id = 'a33110b8-6766-448b-9107-d4ce8ca710d4';

  let user_id = '2bdc686b-37d6-4f71-80d1-49afd67cfed3';
  let classroom_id = 'ed5bb09b-b535-4b94-98e0-6be8af4019b1';
  let period_id = 'ea52f55e-8fd3-405e-87ed-c221cd2466c9';
  let md5result = md5(user_id + ' ' + classroom_id);
  let testQuery = `select md5(('${user_id}', '${classroom_id}'))`;

  // let { rows } = await client.query(testQuery);
  res.json({
    md5: md5result,
    new: md5(
      '(2bdc686b-37d6-4f71-80d1-49afd67cfed3,ed5bb09b-b535-4b94-98e0-6be8af4019b1)',
    ),
    postgresql: testQuery,
  });
  // let insertQuery =
  //   'insert into appointment (user_id, classroom_id, period_id, reserved_date) values ($1, $2, $3, $4) returning *;';
});

module.exports = router;
