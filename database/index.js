const mongoose = require('mongoose');
const Promise = require('bluebird');
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

let save = (repos) => {

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
        console.error(err)
      } else {
        if (res.length === 0) {
          console.log('did not find in db', res)
          new Promise ((resolve, reject) => {
            doc.save((err) => {
              if (err) {
                reject(err)
              } else {
                resolve(console.log('doc added to database'))
              }
            })
          })
        } else  {
          console.log('file found in db')
        }
      }
    })
  }
}

module.exports.save = save;
