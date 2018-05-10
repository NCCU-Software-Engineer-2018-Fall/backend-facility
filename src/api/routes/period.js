'use strict';

const express = require('express');

const doquery = require('../../../config/postgresql');

const router = express.Router();

const periodDefaultTime = [
  {
    symbol: 'A',
    period_name: '0610~0700',
    start_time: '06:10:00',
    end_time: '07:00:00',
  },
  {
    symbol: 'B',
    period_name: '0710~0800',
    start_time: '07:10:00',
    end_time: '08:00:00',
  },
  {
    symbol: '1',
    period_name: '0810~0900',
    start_time: '08:10:00',
    end_time: '09:00:00',
  },
  {
    symbol: '2',
    period_name: '0910~1000',
    start_time: '09:10:00',
    end_time: '10:00:00',
  },
  {
    symbol: '3',
    period_name: '1010~1100',
    start_time: '10:10:00',
    end_time: '11:00:00',
  },
  {
    symbol: '4',
    period_name: '1110~1200',
    start_time: '11:10:00',
    end_time: '12:00:00',
  },
  {
    symbol: 'C',
    period_name: '1210~1300',
    start_time: '12:10:00',
    end_time: '13:00:00',
  },
  {
    symbol: 'D',
    period_name: '1310~1400',
    start_time: '13:10:00',
    end_time: '14:00:00',
  },
  {
    symbol: '5',
    period_name: '1410~1500',
    start_time: '14:10:00',
    end_time: '15:00:00',
  },
  {
    symbol: '6',
    period_name: '1510~1600',
    start_time: '15:10:00',
    end_time: '16:00:00',
  },
  {
    symbol: '7',
    period_name: '1610~1700',
    start_time: '16:10:00',
    end_time: '17:00:00',
  },
  {
    symbol: '8',
    period_name: '1710~1800',
    start_time: '17:10:00',
    end_time: '18:00:00',
  },
  {
    symbol: 'E',
    period_name: '1810~1900',
    start_time: '18:10:00',
    end_time: '19:00:00',
  },
  {
    symbol: 'F',
    period_name: '1910~2000',
    start_time: '19:10:00',
    end_time: '20:00:00',
  },
  {
    symbol: 'G',
    period_name: '2010~2100',
    start_time: '20:10:00',
    end_time: '21:00:00',
  },
];

router.get('/all', (req, res) => {
  let result = doquery('select * from period');
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

router.get('/doInsert', (req, res) => {
  let insertQuery =
    'insert into period (symbol, period_name, start_time, end_time) values ($1, $2, $3, $4) returning *';

  let allResult = periodDefaultTime.map((v, i) => {
    let { symbol, period_name, start_time, end_time } = v;
    let result = doquery(insertQuery, [
      symbol,
      period_name,
      start_time,
      end_time,
    ]);
    return result;
  });
  Promise.all(allResult)
    .then(input => {
      let output = input.map((v, i) => {
        return v.rows[0];
      });
      res.json({
        data: output,
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err,
      });
    });
});

module.exports = router;
