const fetch = require('node-fetch');
const endPoint = require('./config');

/**
 * @api {get} /signIn signIn
 * @apiName signIn
 * @apiGroup Main
 *
 * @apiParam None.
 *
 * @apiSuccess {Object[]} data array of Classroom.
 * @apiSuccess {String} id id of the Classroom (pk).
 * @apiSuccess {String} classroom_id id of the Classroom (AI).
 * @apiSuccess {String} classroom_name name of the Classroom (Unique).
 * @apiSuccess {String} building located building of the Classroom (AI).
 * @apiSuccess {String} floor floor of the Classroom (AI).
 * @apiSuccess {Char} status of the Classroom (For db).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "status": "success",
 *    "data": {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "user_id": 1,
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z"
 *    }
 *  }
 *
 */

function signIn() {
  let data = { studentId: '104703030', studentName: 'Jack Yu' };
  fetch(endPoint + '/signIn', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(error => console.error('Error ', error))
    .then(response => console.log('Success:', response));
}
