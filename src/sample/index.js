const fetch = require('node-fetch');
const endPoint = require('./config');

/**
 * @api {get} /signIn signIn
 * @apiName signIn
 * @apiGroup Signin
 *
 * @apiParam {String} studentId student_id of the student.
 * @apiParam {String} studentName student_name of the student.
 *
 * @apiSuccess {String} status status of the result.
 * @apiSuccess {Object} data of the User.
 * @apiSuccess {Integer} user_id uuid of the Classroom (pk).
 * @apiSuccess {String} student_id id of the student (Unique).
 * @apiSuccess {String} student_name name of the student (Not Null).
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
