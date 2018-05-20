const fetch = require('node-fetch');
const endPoint = require('./config');

/**
 * @api {get} /user/all Get All User
 * @apiName GetAllUser
 * @apiGroup User
 *
 * @apiParam None.
 *
 * @apiSuccess {Object[]} data array of User.
 * @apiSuccess {String} id id of the User (pk).
 * @apiSuccess {String} user_id id of the User (AI).
 * @apiSuccess {String} student_id school id of the User.
 * @apiSuccess {String} student_name school name of the User (AI).
 * @apiSuccess {Char} status of the User (For db).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "data": [
 *      {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "user_id": 1,
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z"
 *      },
 *      {
 *        "id": "2660d148-a3bc-464f-8238-aefe4197326c",
 *        "user_id": 2,
 *        "student_id": "104703005",
 *        "student_name": "Jerry Wang",
 *        "status": "1",
 *        "creation_time": "2018-05-10T07:22:22.206Z"
 *      }
 *    ]
 *  }
 *
 */

function getAllUser() {
  console.log('GET all users');
  fetch(endPoint + '/user/all')
    .then(res => res.text())
    .then(body => {
      console.log(body);
      console.log('END');
    });
}

/**
 * @api {get} /user/queryById/:id Get User By Id
 * @apiName Get User By Id
 * @apiGroup User
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} id id of the User (pk).
 * @apiSuccess {String} user_id id of the User (AI).
 * @apiSuccess {String} student_id school id of the User.
 * @apiSuccess {String} student_name school name of the User (AI).
 * @apiSuccess {Char} status of the User (For db using).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status": "success",
 *      "data": {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "user_id": 1,
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z"
 *      }
 *    }
 *
 */

function getUserById() {
  console.log('GET user by id (pk)');
  fetch(endPoint + '/user/queryById/2bdc686b-37d6-4f71-80d1-49afd67cfed3')
    .then(res => res.text())
    .then(body => {
      console.log(body);
      console.log('END');
    });
}

/**
 * @api {get} /user/queryByStudentId/:studentId Get User By Student Id
 * @apiName Get User By Student Id
 * @apiGroup User
 *
 * @apiParam {Number} studentId Users unique ID.
 *
 * @apiSuccess {String} id id of the User (pk).
 * @apiSuccess {String} user_id id of the User (AI).
 * @apiSuccess {String} student_id school id of the User.
 * @apiSuccess {String} student_name school name of the User (AI).
 * @apiSuccess {Char} status of the User (For db using).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status": "success",
 *      "data": {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "user_id": 1,
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z"
 *      }
 *     }
 *
 */

function getUserByStudentId() {
  console.log('GET user by student id (pk)');
  fetch(endPoint + '/user/queryByStudentId/104703030')
    .then(res => res.text())
    .then(body => {
      console.log(body);
      console.log('END');
    });
}

/**
 * @api {post} /user/insert Add User
 * @apiName add user
 * @apiGroup User
 *
 * @apiParam {String} studentId Users student id (must be Unique).
 * @apiParam {String} studentName Users student name (must be Unique).
 *
 *
 * @apiSuccess {String} id id of the User (pk).
 * @apiSuccess {String} user_id id of the User (AI).
 * @apiSuccess {String} student_id school id of the User.
 * @apiSuccess {String} student_name school name of the User (AI).
 * @apiSuccess {Char} status of the User (For db using).
 * @apiSuccess {TimeStamps} creation_time of the data (For db).
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status": "success",
 *      "data": {
 *        "id": "2bdc686b-37d6-4f71-80d1-49afd67cfed3",
 *        "user_id": 1,
 *        "student_id": "104703030",
 *        "student_name": "Jack Yu",
 *        "status": "1",
 *        "creation_time": "2018-05-09T13:46:54.326Z"
 *      }
 *     }
 *
 */

function insertUser() {
  let data = { studentId: '104703060', studentName: 'Marry Shu' }; // sample input
  fetch(endPoint + '/user/insert', {
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
