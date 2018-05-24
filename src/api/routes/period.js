'use strict';

const Router = require('express-promise-router');

const { doquery, client } = require('../../../config/postgresql');

const router = new Router();

router.get('/all', async (req, res) => {
  let { rows } = await client.query('select id from period');
  let output = rows.map((v, i) => {
    return v.id;
  });
  res.json({
    status: 'success',
    data: output,
  });
  // result
  //   .then(input => {
  //     res.json({
  //       status: 'success',
  //       data: input.rows,
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.json({
  //       status: 'failed',
  //       error: err,
  //     });
  //   });
});

// router.get('/doInsert', (req, res) => {
//   let insertQuery =
//     'insert into period (symbol, period_name, start_time, end_time) values ($1, $2, $3, $4) returning *';

//   let allResult = periodDefaultTime.map((v, i) => {
//     let { symbol, period_name, start_time, end_time } = v;
//     let result = doquery(insertQuery, [
//       symbol,
//       period_name,
//       start_time,
//       end_time,
//     ]);
//     return result;
//   });
//   Promise.all(allResult)
//     .then(input => {
//       let output = input.map((v, i) => {
//         return v.rows[0];
//       });
//       res.json({
//         data: output,
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({
//         error: err,
//       });
//     });
// });

module.exports = router;
