const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
//needs prop to sort repo list handle real time updates
let repoSchema = mongoose.Schema({
  user_name: String,
  github_id: Number,
  avatar_url: String,
  repo_name: String,
  repo_id: Number,
  repo_url: String,
  size: Number,
  star_gazers: Number,
  watchers: Number,
  forks_count: Number,
  open_issues: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;

//array of objects
//run through access each object
  //grab values looking for add to each instance to write to db