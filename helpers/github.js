const request = require('request');
const config = require('../example.js');

let getReposByUsername = (userName) => {
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
    console.error(error)
    console.log('statusCode:', response.statusCode);
    console.log('body', body)
  })


}

module.exports.getReposByUsername = getReposByUsername;