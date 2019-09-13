const request = require('request');
const config = require('../example.js');
const database = require('../database/index.js')

let getReposByUsername = (userName, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  console.log('logged in getReposByUsername',userName)
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    console.error('helpers line 18',error)
    console.log('statusCode:', response.statusCode);
    let report = JSON.parse(body);
    cb(report);

  })


}

module.exports.getReposByUsername = getReposByUsername;