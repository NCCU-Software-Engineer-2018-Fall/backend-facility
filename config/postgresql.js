const { Pool, Client } = require('pg');

const client = new Client();

client.connect(); // need only once at the begining

function doquery(query, values = []) {
  return new Promise(function(resolve, reject) {
    client.query(query, values, function(err, res) {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
}

module.exports = { doquery, client };
