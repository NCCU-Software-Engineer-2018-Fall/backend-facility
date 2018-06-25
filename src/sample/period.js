const fetch = require('node-fetch');
const endPoint = require('./config');

/**
 * @api {get} /period/all Get All Period
 * @apiName get all period
 * @apiGroup Period
 *
 * @apiSuccess {String} status status of the result.
 * @apiSuccess {Object[]} data array of Period.
 * @apiSuccess {String} id uuid of the Period (pk).
 * @apiSuccess {String} period_id id of the Period (AI).
 * @apiSuccess {String} symbol symbol of the Period.
 * @apiSuccess {String} period_name name of the Period (Unique).
 * @apiSuccess {Time} start_time start time of the Period (Unique).
 * @apiSuccess {Time} end_time end time of the Period (Unique).
 * @apiSuccess {Char} status of the Period (For db).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   "status": "success",
 *   "data": [
 *     {
 *       "id": "ea52f55e-8fd3-405e-87ed-c221cd2466c9",
 *       "period_id": 1,
 *       "symbol": "A",
 *       "period_name": "0610~0700",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.427Z",
 *       "start_time": "06:10:00",
 *       "end_time": "07:00:00"
 *     },
 *     {
 *       "id": "b919dec9-ef4f-42ab-94ae-e7ceaa8bcd29",
 *       "period_id": 2,
 *       "symbol": "B",
 *       "period_name": "0710~0800",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.432Z",
 *       "start_time": "07:10:00",
 *       "end_time": "08:00:00"
 *     },
 *     {
 *       "id": "9aa22837-fc46-4581-93ba-efb27ef80df1",
 *       "period_id": 3,
 *       "symbol": "1",
 *       "period_name": "0810~0900",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.433Z",
 *       "start_time": "08:10:00",
 *       "end_time": "09:00:00"
 *     },
 *     {
 *       "id": "9264d8a9-a5cc-46c2-95d9-cf6a68cfc664",
 *       "period_id": 4,
 *       "symbol": "2",
 *       "period_name": "0910~1000",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.434Z",
 *       "start_time": "09:10:00",
 *       "end_time": "10:00:00"
 *     },
 *     {
 *       "id": "e934ded2-0623-4d79-a1f4-082609ebea1a",
 *       "period_id": 5,
 *       "symbol": "3",
 *       "period_name": "1010~1100",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.435Z",
 *       "start_time": "10:10:00",
 *       "end_time": "11:00:00"
 *     },
 *     {
 *       "id": "e1e32146-e497-4ec6-8bd6-aa6f44316b35",
 *       "period_id": 6,
 *       "symbol": "4",
 *       "period_name": "1110~1200",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.436Z",
 *       "start_time": "11:10:00",
 *       "end_time": "12:00:00"
 *     },
 *     {
 *       "id": "ed2ad19b-67b3-418e-bf49-a80ff9fa5ee7",
 *       "period_id": 7,
 *       "symbol": "C",
 *       "period_name": "1210~1300",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.436Z",
 *       "start_time": "12:10:00",
 *       "end_time": "13:00:00"
 *     },
 *     {
 *       "id": "36a5f6c1-15df-4ee2-895b-ce0d9b7a36b4",
 *       "period_id": 8,
 *       "symbol": "D",
 *       "period_name": "1310~1400",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.437Z",
 *       "start_time": "13:10:00",
 *       "end_time": "14:00:00"
 *     },
 *     {
 *       "id": "fb60e250-fc57-42bc-baca-d4e7666762b1",
 *       "period_id": 9,
 *       "symbol": "5",
 *       "period_name": "1410~1500",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.438Z",
 *       "start_time": "14:10:00",
 *       "end_time": "15:00:00"
 *     },
 *     {
 *       "id": "83160ebf-90e6-4f92-a82d-3bd3647b258b",
 *       "period_id": 10,
 *       "symbol": "6",
 *       "period_name": "1510~1600",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.439Z",
 *       "start_time": "15:10:00",
 *       "end_time": "16:00:00"
 *     },
 *     {
 *       "id": "35a5459a-8b58-48db-bcc2-3003c8cf080b",
 *       "period_id": 11,
 *       "symbol": "7",
 *       "period_name": "1610~1700",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.440Z",
 *       "start_time": "16:10:00",
 *       "end_time": "17:00:00"
 *     },
 *     {
 *       "id": "5ce12c65-15f0-49f2-adbf-735c69d8af3f",
 *       "period_id": 12,
 *       "symbol": "8",
 *       "period_name": "1710~1800",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.441Z",
 *       "start_time": "17:10:00",
 *       "end_time": "18:00:00"
 *     },
 *     {
 *       "id": "7318648c-0c88-4637-b17b-bcafa136a597",
 *       "period_id": 13,
 *       "symbol": "E",
 *       "period_name": "1810~1900",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.442Z",
 *       "start_time": "18:10:00",
 *       "end_time": "19:00:00"
 *     },
 *     {
 *       "id": "fa132f26-94da-4b98-aac3-15138adbb9ef",
 *       "period_id": 14,
 *       "symbol": "F",
 *       "period_name": "1910~2000",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.442Z",
 *       "start_time": "19:10:00",
 *       "end_time": "20:00:00"
 *     },
 *     {
 *       "id": "deab8e53-6bf0-4efc-a4e1-62df0d3f5d18",
 *       "period_id": 15,
 *       "symbol": "G",
 *       "period_name": "2010~2100",
 *       "status": "1",
 *       "creation_time": "2018-05-10T08:16:11.443Z",
 *       "start_time": "20:10:00",
 *       "end_time": "21:00:00"
 *     }
 *   ]
 * }
 *
 */

function getAllPeriod() {
  console.log('GET all Periods');
  fetch(endPoint + '/period/all')
    .then(res => res.text())
    .then(body => {
      console.log(body);
      console.log('END');
    });
}
