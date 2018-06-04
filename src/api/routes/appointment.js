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
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id from appointment
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

router.get('/random', async (req, res) => {
  let user_id = '2bdc686b-37d6-4f71-80d1-49afd67cfed3';
  let classroom_id = 'ed5bb09b-b535-4b94-98e0-6be8af4019b1';
  let period_id = period.data[9];
  let date = '2018-05-08';

  let { rows } = await client.query(
    'select hash_check from appointment where hash_check=$1',
    [md5(`(${user_id},${classroom_id},${period_id},${date})`)],
  );
  if (rows.length > 0) {
    console.log('holy shit?');
    res.json({
      status: 'failed',
      error: 'already exist',
    });
  } else {
    let query = `
      insert into appointment (user_id, classroom_id, period_id, reserved_date, hash_check)
      values ($1, $2, $3, $4, md5($5))`;
    let result = await client.query(query, [
      user_id,
      classroom_id,
      period_id,
      date,
      `(${classroom_id},${period_id},${date})`,
    ]);
    if (result.rows) {
      res.json({
        status: 'success',
        data: rows[0],
      });
    } else {
      res.json({
        status: 'failed',
        error: result,
      });
    }
  }
});

router.get('/randomall', async (req, res) => {
  const user_id = 'e7ec8dd5-5a58-410d-8ad0-0e34bc02dfe6';
  const classroom_id = 'a33110b8-6766-448b-9107-d4ce8ca710d4';

  let date = '2018-05-25';
  let todos = [];
  for (let i = 11; i < 15; i++) {
    let period_id = period.data[i];

    let { rows } = await client.query(
      'select hash_check from appointment where hash_check=$1',
      [md5(`(${classroom_id},${period_id},${date})`)],
    );

    if (rows.length > 0) {
      res.json({
        status: 'failed',
        error: 'already exist',
      });
    } else {
      let query = `
        insert into appointment (user_id, classroom_id, period_id, reserved_date, hash_check)
        values ($1, $2, $3, $4, md5($5))`;
      let result = doquery(query, [
        user_id,
        classroom_id,
        period_id,
        date,
        `(${classroom_id},${period_id},${date})`,
      ]);
      todos.push(result);
    }
  }

  Promise.all(todos)
    .then(input => {
      // console.log(input.length);
      let output = input.map((v, i) => {
        console.log(v.rows);
      });
      res.json({
        status: 'success',
        data: 'yo man',
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        status: 'failed',
        error: err,
      });
    });
});

router.get('/query/byUser/:user_id', (req, res) => {
  if (!req.params.user_id) {
    throw 'user_id not availiable';
    res.json({
      status: 'failed',
      error: 'user_id cannot be null or undefined',
    });
  }
  let query = `
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id
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
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id
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
      select *, to_char(reserved_date, 'YYYY-MM-DD') as reserved_date, c.id as classroom_id, p.id as period_id, u.id as user_id from appointment
      inner join classroom c on appointment.classroom_id = c.id
      inner join period p on appointment.period_id = p.id
      inner join users u on appointment.user_id = u.id
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

router.get('/create', async (req, res) => {
  // console.log(req.body);
  const testing = {
    user_id: '2bdc686b-37d6-4f71-80d1-49afd67cfed3',
    classroom_id: '1cc41e7b-5b75-4956-b85d-c8020f8ee268',
    time: [
      {
        date: '2018-06-20',
        period_id: 'fa132f26-94da-4b98-aac3-15138adbb9ef',
      },
      {
        date: '2018-06-21',
        period_id: 'fa132f26-94da-4b98-aac3-15138adbb9ef',
      },
      {
        date: '2018-06-22',
        period_id: 'fa132f26-94da-4b98-aac3-15138adbb9ef',
      },
    ],
  };

  const checking = testing.time.map(async (v, i) => {
    let toHash = `(${testing.user_id},${v.period_id},${v.date})`;
    let query = 'select hash_check from appointment where hash_check = $1';
    let { rows } = await client.query(query, [toHash]);
    console.log('inside: ', i, rows);
    return { result: rows.length == 0 ? 'empty' : 'exist' };
  });
  Promise.all(checking).then(input => {
    console.log('inside promise: ', input);
    res.json({
      status: 'success',
      data: input,
    });
  });

  // Promise.all(checking).then(input => {
  //   let output = input.map((v, i) => {
  //     console.log('data: ', i, v);
  //     return v.rows[0] == null ? 'empty' : v.rows[0];
  //   });
  //   res.json({
  //     status: 'success',
  //     data: output,
  //   });
  // });

  // res.json({
  //   status: 'succes',
  // });
});

// 1. user => all done
// 2. user & classroom => all? done =>  group by date (maybe)
// 3. user & classroom & date => all ? none implement by 2
// 4. classroom => all done
// 5. classroom & date => all ? none implement by 5
module.exports = router;
