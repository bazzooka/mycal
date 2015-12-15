var express = require('express');
var app = express();
var mongodb = require('mongodb');
var Trello = require("node-trello");
var MongoClient = require('mongodb').MongoClient;

var TrelloAPI = require("./server/trello");
var Organizer = require("./server/organizer");

var db;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('Hello World!');
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

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/mycal", function(err, database) {
  if (err) throw err;

  	db = database;

  	var server = app.listen(3000, function() {
    	var host = server.address().address;
    	var port = server.address().port;

    	console.log('Example app listening at http://%s:%s', host, port);
  	});
});
