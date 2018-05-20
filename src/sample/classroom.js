const fetch = require('node-fetch');
const endPoint = require('./config');

/**
 * @api {get} /classroom/all Get All Classroom
 * @apiName get all classroom
 * @apiGroup ClassRoom
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
 *
 *  {
 *    "data": [
 *      {
 *        "id": "ed5bb09b-b535-4b94-98e0-6be8af4019b1",
 *        "classroom_id": 1,
 *        "classroom_name": "大仁樓200101",
 *        "building": null,
 *        "floor": null,
 *        "state": "1",
 *        "creation_time": "2018-05-10T07:49:52.578Z"
 *      }
 *    ]
 *  }
 *
 */

function getAllClassroom() {
  console.log('GET all Classrooms');
  fetch(endPoint + '/classroom/all')
    .then(res => res.text())
    .then(body => {
      console.log(body);
      console.log('END');
    });
}
