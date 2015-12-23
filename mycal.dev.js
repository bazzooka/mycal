/* eslint no-console: 0 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3006 : process.env.PORT;

var app = express();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var TrelloAPI = require("./server/trello");
var Organizer = require("./server/organizer");

var MyTrelloAPI = null;
var db;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tests', function(req, res) {
  res.send("myCal.dev.js");
});

// Get all the cards
app.get('/authTrello', function(req, res) {
  var token = req.query.token;
  var Trello = new TrelloAPI(token),
  _cards = [];

  Trello.dropTrellos(db).then(function() {
    console.log("Drop cards");
    return Trello.getAllCards(token);
  }).then(function(cards) {
    console.log("Add cards");

    cards = cards.map(function(obj) {
      obj.userId = "Joe";
      return obj;
    });

    _cards = cards;

    Trello.addCardsInDb(db, cards);
  }).then(function() {
    console.log("Cards length " + _cards.length);
    res.send("" + _cards.length);
    return true;
  }).catch(function(err) {
    console.log(arguments);
    res.send(err);
  });
});

app.get('/organize', function(req, res) {
  var userId = req.query.userId;
  var organizer = new Organizer(db, userId);

  organizer.organize();
  res.send("OK");
});

app.post('/api/authTrello', function(req, res) {
  var boards = req.body.boards,
    userId = req.body.userId,
    token = req.body.token;

  var boardsObj = JSON.parse(boards);
  TrelloAPI = new TrelloAPI(token);
  TrelloAPI.addBoardsInDb({"db": db, "boards": boards, "userId": userId, "token": token});

  res.send('OK');
})

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/mycal", function(err, database) {
  if (err) throw err;

  db = database;

  var server = app.listen(port, function() {
     var host = server.address().address;
     var port = server.address().port;

     console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
   });
});

/*===================*/

