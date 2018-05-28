const fetch = require('node-fetch');
const endPoint = require('./config');

/**
 * @api {get} /appointment/all Get All Appointment
 * @apiName get all appointment
 * @apiGroup Appointment
 *
 * @apiParam None.
 *
 * @apiSuccess {Object[]} data array of Appointment.
 * @apiSuccess {String} id id of the Appointment (pk).
 * @apiSuccess {String} appointment_id id of the Appointment (AI).
 * @apiSuccess {String} user_id id of the User (pk).
 * @apiSuccess {String} classroom_id id of the Classroom (pk).
 * @apiSuccess {String} period_id id of the Period (pk).
 * @apiSuccess {Date} reserved_date Date of the Appointment.
 * @apiSuccess {String} classroom_name of the Classroom (Unique).
 * @apiSuccess {String} [building] located building of the Classroom.
 * @apiSuccess {String} [floor] floor of the Classrooom.
 * @apiSuccess {String} period_id id of the Period (AI).
 * @apiSuccess {String} symbol symbol of the Period.
 * @apiSuccess {String} period_name name of the Period (Unique).
 * @apiSuccess {Time} start_time start time of the Period (Unique).
 * @apiSuccess {Time} end_time end time of the Period (Unique).
 * @apiSuccess {Char} status of the Appointment (For db).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "status": "success",
 *    "data": [
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 4,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "9aa22837-fc46-4581-93ba-efb27ef80df1",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "6e3233a69fa3e57dc09643a5636c0072",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "1",
 *        "period_name": "0810~0900",
 *        "start_time": "08:10:00",
 *        "end_time": "09:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 5,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "9264d8a9-a5cc-46c2-95d9-cf6a68cfc664",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "ff99ae356361e827081c14dc8fd71820",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "2",
 *        "period_name": "0910~1000",
 *        "start_time": "09:10:00",
 *        "end_time": "10:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 6,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "e934ded2-0623-4d79-a1f4-082609ebea1a",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "102960a53d8ea1f7bf3847aa5a63c5c8",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "3",
 *        "period_name": "1010~1100",
 *        "start_time": "10:10:00",
 *        "end_time": "11:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 7,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "e1e32146-e497-4ec6-8bd6-aa6f44316b35",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "42a65b7a25e5b8bf3656047bfdbf24db",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "4",
 *        "period_name": "1110~1200",
 *        "start_time": "11:10:00",
 *        "end_time": "12:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 8,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "ed2ad19b-67b3-418e-bf49-a80ff9fa5ee7",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "facad1a0f6d6ea4a9c53bc2c288161d8",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "C",
 *        "period_name": "1210~1300",
 *        "start_time": "12:10:00",
 *        "end_time": "13:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 9,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "36a5f6c1-15df-4ee2-895b-ce0d9b7a36b4",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "1654f9e21fb0093b791f62d44aec87a4",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "D",
 *        "period_name": "1310~1400",
 *        "start_time": "13:10:00",
 *        "end_time": "14:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 10,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "fb60e250-fc57-42bc-baca-d4e7666762b1",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "ece83feec8e084bc447ebf597ac04390",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "5",
 *        "period_name": "1410~1500",
 *        "start_time": "14:10:00",
 *        "end_time": "15:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 11,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "83160ebf-90e6-4f92-a82d-3bd3647b258b",
 *        "reserved_date": "2018-05-08",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "b823f72167730815ebd3fb7faaa331c0",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "6",
 *        "period_name": "1510~1600",
 *        "start_time": "15:10:00",
 *        "end_time": "16:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 12,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "5ce12c65-15f0-49f2-adbf-735c69d8af3f",
 *        "reserved_date": "2018-05-22",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "d9e7e2b4ede829703bb13a568e4e7954",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "8",
 *        "period_name": "1710~1800",
 *        "start_time": "17:10:00",
 *        "end_time": "18:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "appointment_id": 13,
 *        "user_id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "classroom_id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "period_id": "7318648c-0c88-4637-b17b-bcafa136a597",
 *        "reserved_date": "2018-05-22",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z",
 *        "hash_check": "0dbaa35c437b23ff2ed63d6fd1f0bf40",
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "symbol": "E",
 *        "period_name": "1810~1900",
 *        "start_time": "18:10:00",
 *        "end_time": "19:00:00",
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu"
 *      },
 *    ]
 *  }
 *
 */

function getAllAppointment() {
  console.log('GET all Classrooms');
  fetch(endPoint + '/appointment/all')
    .then(res => res.text())
    .then(body => {
      console.log(body);
      console.log('END');
    });
}
