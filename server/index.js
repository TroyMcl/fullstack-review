const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helpers = require('../helpers/github.js')
let app = express();


// mongoose.connect('mongodb://localhost/github', {useNewUrlParser: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected to db')
// });

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log('request sent', req.body.user)
  helpers.getReposByUsername(req.body.user)
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

