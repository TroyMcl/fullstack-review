const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helpers = require('../helpers/github.js')
const database = require('../database/index.js')
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
  console.log('request sent', req.body.user)
  let repos = helpers.getReposByUsername(req.body.user, database.save)

});

app.get('/repos', function (req, res) {
  database.fetch((err, data) => {
    if (err) {
      console.error(err)
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// new Promise (resolve, reject) => {
//   let data = database.fetch();

// }

// res.json(data)
