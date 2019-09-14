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

//access repos array return array of top 25 results
  //loop through array
  //check size prop of array
let filterRepos = (repos) => {
  console.log(typeof repos)
  console.log(repos[2].size)
  for (let i =0; i < repos.length; i++) {
    let obj = {
      name: repos[i].user_name,
      url: repos[i].repo_url,
      size: repos[i].size,
    }
    console.log(obj)
  }
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.filterRepos = filterRepos;