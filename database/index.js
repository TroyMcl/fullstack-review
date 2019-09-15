const mongoose = require('mongoose');
const Promise = require('bluebird');
const helpers = require('../helpers/github.js')
mongoose.connect('mongodb://localhost/fetcher');
//needs prop to sort repo list handle real time updates
let repoSchema =  new mongoose.Schema({
  user_name: String,
  repo_name: String,
  repo_id: Number,
  repo_url: String,
  size: Number,
  watchers: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {
  let count = 0;

  for(let i =0; i < repos.length; i++) {
    let doc = new Repo({
    user_name: repos[i].owner.login,
    repo_name: repos[i].name,
    repo_id: repos[i].id,
    repo_url: repos[i].html_url,
    size: repos[i].size,
    watchers: repos[i].watchers,
    forks_count: repos[i].forks
    });

    Repo.find({repo_id: doc.repo_id}, (err, res) => {
      if (err) {
        cb(err)
      } else {
        if (res.length === 0) {
          console.log('did not find in db', res)
          doc.save()
          count++
          console.log('added to db')
        } else  {
          count++
          console.log('file found in db')
        }
        if (count === repos.length ) {
          cb(200)
        }

      }
    })
  }
}

let fetch = (cb) => {
  let repos = Repo.find({}, (error, res) => {
    if (error) {
      cb(error,null)
    } else {
      console.log('docs read')
      cb(null, helpers.filterRepos(res))
    }
  })
}



module.exports.save = save;
module.exports.fetch = fetch;