const fetch = require('node-fetch');
const endPoint = require('./config');

/**
 * @api {get} /batch/all Get All Classroom
 * @apiName get all Batch
 * @apiGroup Batch
 *
 * @apiSuccess {Object[]} data array of Batch.
 * @apiSuccess {String} id id of the batch (pk).
 * @apiSuccess {String} batch_id id of the batch (AI).
 * @apiSuccess {String} user_id id of user (fk).
 * @apiSuccess {Char} status of the Classroom (For db).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "status": "success",
 *    "data": [
 *      {
 *        "id": "4a0b6edd-0a55-417c-9b23-e813e865a37f",
 *        "batch_id": 9,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-06T07:18:44.611Z",
 *        "title": "新建訂單"
 *      },
 *      {
 *        "id": "ceab8312-4536-4d65-a925-ad559726be23",
 *        "batch_id": 10,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-06T07:22:03.237Z",
 *        "title": "新建訂單"
 *      },
 *      {
 *        "id": "6129920d-fd6f-45c3-aa56-50aab831b491",
 *        "batch_id": 11,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-07T07:25:23.079Z",
 *        "title": "租借測試"
 *      },
 *      {
 *        "id": "5fc6a43e-ce7f-4c36-acbc-d5aedaae1eab",
 *        "batch_id": 12,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-07T08:45:46.976Z",
 *        "title": "測試借用"
 *      },
 *      {
 *        "id": "7c8901f8-aefc-45b0-a0ff-a2fada50f45e",
 *        "batch_id": 13,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-09T03:47:26.604Z",
 *        "title": "測試0609"
 *      },
 *      {
 *        "id": "29a9fa05-67d7-4710-82e6-6633d9536516",
 *        "batch_id": 14,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-14T16:18:07.107Z",
 *        "title": "6/11"
 *      },
 *      {
 *        "id": "19e1126c-1868-44ed-bbf5-6e3fdeae3c65",
 *        "batch_id": 15,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-14T16:21:44.074Z",
 *        "title": "200103-6/12"
 *      },
 *      {
 *        "id": "d67c9383-7a23-45f1-b50c-ea26fd3c85f1",
 *        "batch_id": 16,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-15T16:37:37.634Z",
 *        "title": "123"
 *      },
 *      {
 *        "id": "f9f80eff-0799-46f1-b26f-9c961898724a",
 *        "batch_id": 17,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-16T02:48:03.584Z",
 *        "title": "test"
 *      },
 *      {
 *        "id": "397099a8-f2e3-4e5c-b1c4-14f773b2e63e",
 *        "batch_id": 18,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-18T03:50:59.552Z",
 *        "title": "06/18test"
 *      },
 *      {
 *        "id": "ad4236cd-0e59-4f4f-b18e-5133931a0dd1",
 *        "batch_id": 19,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-22T05:44:45.496Z",
 *        "title": "測試0622"
 *      },
 *      {
 *        "id": "7bf6e4fe-ec27-4b03-bda6-c3b0085570a6",
 *        "batch_id": 20,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-23T11:35:02.504Z",
 *        "title": "time test"
 *      },
 *      {
 *        "id": "532270b2-3d27-4ee6-b514-63d4fbf7e0c7",
 *        "batch_id": 21,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-23T11:46:40.868Z",
 *        "title": "room test"
 *      },
 *      {
 *        "id": "2a3230e3-974d-4776-a82b-ab473e00ad41",
 *        "batch_id": 22,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-23T11:47:19.269Z",
 *        "title": "room weekly test"
 *      },
 *      {
 *        "id": "cb564479-04ac-4100-9e02-a01d470e6a56",
 *        "batch_id": 23,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-24T05:15:14.291Z",
 *        "title": "借用"
 *      },
 *      {
 *        "id": "2b43b47f-b467-4e20-af0a-4fdf179e732e",
 *        "batch_id": 24,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "status": "1",
 *        "create_time": "2018-06-25T05:56:45.226Z",
 *        "title": "test 0625"
 *      }
 *    ]
 *  }
 *
 */
