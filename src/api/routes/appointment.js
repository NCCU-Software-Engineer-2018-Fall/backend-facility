'use strict';

const moment = require('moment-timezone');
var md5 = require('md5');

const { doquery, client } = require('../../../config/postgresql');

const Router = require('express-promise-router');
const router = new Router();

const period = {
  data: [
    'ea52f55e-8fd3-405e-87ed-c221cd2466c9',
    'b919dec9-ef4f-42ab-94ae-e7ceaa8bcd29',
    '9aa22837-fc46-4581-93ba-efb27ef80df1',
    '9264d8a9-a5cc-46c2-95d9-cf6a68cfc664',
    'e934ded2-0623-4d79-a1f4-082609ebea1a',
    'e1e32146-e497-4ec6-8bd6-aa6f44316b35',
    'ed2ad19b-67b3-418e-bf49-a80ff9fa5ee7',
    '36a5f6c1-15df-4ee2-895b-ce0d9b7a36b4',
    'fb60e250-fc57-42bc-baca-d4e7666762b1',
    '83160ebf-90e6-4f92-a82d-3bd3647b258b',
    '35a5459a-8b58-48db-bcc2-3003c8cf080b',
    '5ce12c65-15f0-49f2-adbf-735c69d8af3f',
    '7318648c-0c88-4637-b17b-bcafa136a597',
    'fa132f26-94da-4b98-aac3-15138adbb9ef',
    'deab8e53-6bf0-4efc-a4e1-62df0d3f5d18',
  ],
};

function hashCheckSQLGenerate(user_id, classroom_id, period_id, date) {
  let tohash = `(${user_id},${classroom_id},${period_id},${date})`;
  return `select md5('${tohash}')`;
}

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
  let date = '2018-05-08';

  let { rows } = await client.query(testQuery);
  res.json({
    tohash,
    md5: md5result,
    psql: rows[0],
    // postgresql: rows[0],
  });
  // let insertQuery =
  //   'insert into appointment (user_id, classroom_id, period_id, reserved_date) values ($1, $2, $3, $4) returning *;';
});

module.exports = router;
