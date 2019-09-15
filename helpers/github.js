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
    if (error) {
      cb(error)
    } else {
      cb(null, database.save(report))
    }
  })

}

let filterRepos = (repos) => {
  let res = []
  for (let i =0; i < repos.length; i++) {
    let obj = {
      name: repos[i].user_name,
      repo_name: repos[i].repo_name,
      url: repos[i].repo_url,
      size: repos[i].size,
    }
    res.push(obj)
  }
  let sorted = mergeSort(res);
  sorted = sorted.splice(0, 24)
  return sorted;
}
var mergeSort = function(array) {
  if (array.length <= 1) {
    return array
  }
  let middle = Math.floor(array.length/2);
  let left = array.slice(0, middle);
  let right = array.slice(middle);

  return sort(mergeSort(left),mergeSort(right));
};

let sort = (leftArray, rightArray) => {
  let resArray = [];
  let leftCount = 0;
  let rightCount = 0;

  while (leftCount <  leftArray.length && rightCount < rightArray.length) {
    if (leftArray[leftCount].size > rightArray[rightCount].size) {
      resArray.push(leftArray[leftCount]);
      leftCount++
    } else {
      resArray.push(rightArray[rightCount]);
      rightCount++
    }
  }
  return resArray.concat(leftArray.slice(leftCount).concat(rightArray.slice(rightCount)))

}



module.exports.getReposByUsername = getReposByUsername;
module.exports.filterRepos = filterRepos;