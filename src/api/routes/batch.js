'use strict';

const moment = require('moment-timezone');
var md5 = require('md5');

const { doquery, client } = require('../../../config/postgresql');

const Router = require('express-promise-router');
const router = new Router();

router.get('/all', async (req, res) => {
  let query = 'select * from batch_order';
  let batchResult = await client.query(query);
  console.log(batchResult);
  res.json({
    status: 'success',
    data: batchResult.rows,
  });
});

router.get('/query/byUserId/:user_id', async (req, res) => {
  let query = 'select * from batch_order where user_id=$1';
  let batchResult = await client.query(query, [req.params.user_id]);
  res.json({
    status: 'success',
    data: batchResult.rows,
  });
});

module.exports = router;
