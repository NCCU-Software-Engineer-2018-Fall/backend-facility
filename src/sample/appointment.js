var moment = require('moment-timezone');

function randomDate() {
  let max = 30;
  let min = 0;
  return Math.floor(Math.random() * (max - min) + min);
}

var start = moment('2018-05-01').format('x');
var end = moment('2018-05-31').format('x');

console.log(start.add(1, 'days'));
