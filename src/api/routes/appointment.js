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
  let query = `
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id, bo.id as batch_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id
      inner join batch_order bo on appointment.batch_id = bo.id`;

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

router.get('/test', async (req, res) => {
  // let period_id = '7318648c-0c88-4637-b17b-bcafa136a597'; // symbol: E
  // let period_id = 'fa132f26-94da-4b98-aac3-15138adbb9ef'; // symbol: F
  // let user_id = '2660d148-a3bc-464f-8238-aefe4197326c';
  // let classroom_id = 'a33110b8-6766-448b-9107-d4ce8ca710d4';

  let user_id = '2bdc686b-37d6-4f71-80d1-49afd67cfed3';
  let classroom_id = 'ed5bb09b-b535-4b94-98e0-6be8af4019b1';
  let period_id = 'ea52f55e-8fd3-405e-87ed-c221cd2466c9';
  let date = '2018-05-08';

  let output = period.data.map((v, i) => {
    let testQuery = hashCheckSQLGenerate(user_id, classroom_id, v, date);
    // console.log('number: ', i, ' data:', rows[0]);
    return client.query(testQuery);
  });
  let selfHash = period.data.map((v, i) => {
    let toHash = `(${user_id},${classroom_id},${v},${date})`;
    return md5(toHash);
  });

  Promise.all(output)
    .then(each => {
      let output = each.map(v => {
        // return { db: v.rows[0].md5, node: selfHash[i] };
        return v.rows[0].md5;
      });
      res.json({
        data: output,
        selfHash,
      });
    })
    .catch(err => {
      res.json({
        status: 'failed',
        error: err,
      });
    });
  // res.json({
  //   result: output,
  //   // postgresql: rows[0],
  // });
  // let insertQuery =
  //   'insert into appointment (user_id, classroom_id, period_id, reserved_date) values ($1, $2, $3, $4) returning *;';
});

// router.get('/random', async (req, res) => {
//   let user_id = '2bdc686b-37d6-4f71-80d1-49afd67cfed3';
//   let classroom_id = 'ed5bb09b-b535-4b94-98e0-6be8af4019b1';
//   let period_id = period.data[9];
//   let date = '2018-05-08';

//   let { rows } = await client.query(
//     'select hash_check from appointment where hash_check=$1',
//     [md5(`(${user_id},${classroom_id},${period_id},${date})`)],
//   );
//   if (rows.length > 0) {
//     console.log('holy shit?');
//     res.json({
//       status: 'failed',
//       error: 'already exist',
//     });
//   } else {
//     let query = `
//       insert into appointment (user_id, classroom_id, period_id, reserved_date, hash_check)
//       values ($1, $2, $3, $4, md5($5))`;
//     let result = await client.query(query, [
//       user_id,
//       classroom_id,
//       period_id,
//       date,
//       `(${classroom_id},${period_id},${date})`,
//     ]);
//     if (result.rows) {
//       res.json({
//         status: 'success',
//         data: rows[0],
//       });
//     } else {
//       res.json({
//         status: 'failed',
//         error: result,
//       });
//     }
//   }
// });

// router.get('/randomall', async (req, res) => {
//   const user_id = 'e7ec8dd5-5a58-410d-8ad0-0e34bc02dfe6';
//   const classroom_id = 'a33110b8-6766-448b-9107-d4ce8ca710d4';

//   let date = '2018-05-25';
//   let todos = [];
//   for (let i = 11; i < 15; i++) {
//     let period_id = period.data[i];

//     let { rows } = await client.query(
//       'select hash_check from appointment where hash_check=$1',
//       [md5(`(${classroom_id},${period_id},${date})`)],
//     );

//     if (rows.length > 0) {
//       res.json({
//         status: 'failed',
//         error: 'already exist',
//       });
//     } else {
//       let query = `
//         insert into appointment (user_id, classroom_id, period_id, reserved_date, hash_check)
//         values ($1, $2, $3, $4, md5($5))`;
//       let result = doquery(query, [
//         user_id,
//         classroom_id,
//         period_id,
//         date,
//         `(${classroom_id},${period_id},${date})`,
//       ]);
//       todos.push(result);
//     }
//   }

//   Promise.all(todos)
//     .then(input => {
//       // console.log(input.length);
//       let output = input.map((v, i) => {
//         console.log(v.rows);
//       });
//       res.json({
//         status: 'success',
//         data: 'yo man',
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({
//         status: 'failed',
//         error: err,
//       });
//     });
// });

router.get('/query/byUser/:user_id', (req, res) => {
  if (!req.params.user_id) {
    throw 'user_id not availiable';
    res.json({
      status: 'failed',
      error: 'user_id cannot be null or undefined',
    });
  }
  let query = `
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id, bo.id as batch_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id
      inner join batch_order bo on appointment.batch_id = bo.id
      where appointment.user_id = $1`;
  let { user_id } = req.params;
  let result = doquery(query, [user_id]);

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

router.get('/query/byClassroom/:classroom_id', (req, res) => {
  if (!req.params.classroom_id) {
    throw 'user_id not availiable';
    res.json({
      status: 'failed',
      error: 'user_id cannot be null or undefined',
    });
  }
  let query = `
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id, bo.id as batch_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id
      inner join batch_order bo on appointment.batch_id = bo.id
      where appointment.classroom_id = $1`;
  let { classroom_id } = req.params;
  let result = doquery(query, [classroom_id]);

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

router.post('/query/byUserAndClassroom', (req, res) => {
  if (!req.body.user_id && !req.body.classroom_id) {
    res.json({
      status: 'failed',
      error: 'user_id or classroom_id cannot be null or undefined',
    });
  }
  let query = `
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id, bo.id as batch_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id
      inner join batch_order bo on appointment.batch_id = bo.id
      where appointment.user_id = $1
        and appointment.classroom_id = $2`;
  let { user_id, classroom_id } = req.body;

  let result = doquery(query, [user_id, classroom_id]);
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

function checkIfUnique(input) {
  let temp = [];

  const { classroom_id, title, time } = input;

  for (let i = 0; i < time.length; i++) {
    let { date, period_id } = time[i];
    let toHash = `(${classroom_id},${period_id},${date})`;
    let hash = md5(toHash);
    let toFind = temp.find(i => {
      return i == hash;
    });

    if (toFind) {
      return false;
    } else {
      temp.push(md5(toHash));
    }
  }
  return true;
}

router.post('/create', async (req, res) => {
  const { user_id, classroom_id, title, time } = req.body;
  console.log('this is req.body: ', req.body);
  if (!user_id || !classroom_id || !title) {
    res.json({
      status: 'failed',
      error: 'user_id or classroom_id or title cannot be null or empty',
    });
    console.log('error status 1');
    return;
  } else if (time.length == 0) {
    res.json({
      status: 'failed',
      error: 'time cannot be null or empty',
    });
    console.log('error status 2');
    return;
  }

  if (!checkIfUnique(Object.assign({}, req.body))) {
    res.json({
      status: 'failed',
      error: 'data must be unique',
    });
    return;
  }

  let batchQuery = `insert into batch_order (title, user_id) values ($1, $2) RETURNING *`;
  let batchResult = await client.query(batchQuery, [title, user_id]);
  const batch_id = batchResult.rows[0].id;

  let resolve = [];

  for (let i = 0; i < time.length; i++) {
    let { date, period_id } = time[i];

    if (!date || !period_id) {
      continue;
    }

    let toHash = `(${classroom_id},${period_id},${date})`;
    let query = `select id, hash_check from appointment where hash_check=md5($1)`;

    let { rows } = await client.query(query, [
      `(${classroom_id},${period_id},${date})`,
    ]);
    console.log('number: ', i, rows[0]);

    if (rows.length == 0) {
      let query = `
              insert into appointment (batch_id, user_id, classroom_id, period_id, reserved_date, hash_check)
              values ($1, $2, $3, $4, $5, md5($6))`;
      console.log(
        'ready to insert: ',
        batch_id,
        user_id,
        classroom_id,
        period_id,
        date,
      );
      let insertResult = await client.query(query, [
        batch_id,
        user_id,
        classroom_id,
        period_id,
        date,
        `(${classroom_id},${period_id},${date})`,
      ]);
      console.log('insert result', insertResult);
      resolve.push({
        number: i,
        result: insertResult,
      });
    } else {
      resolve.push({
        status: 'failed',
        target: {
          batch_id,
          user_id,
          classroom_id,
          period_id,
          date,
          hash_check: md5(`(${classroom_id},${period_id},${date})`),
        },
      });
    }
  }

  console.log('end !!', resolve);
  res.json({
    status: 'success',
    data: resolve,
  });
});

// 1. user => all done
// 2. user & classroom => all? done =>  group by date (maybe)
// 3. user & classroom & date => all ? none implement by 2
// 4. classroom => all done
// 5. classroom & date => all ? none implement by 5
module.exports = router;
