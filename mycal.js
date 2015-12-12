var express = require('express');
var app = express();
var Trello = require("node-trello");

var TrelloAPI = require("./server/trello");

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Get all the cards
app.get('/authTrello', function(req, res){
	var token = req.query.token;
	var Trello = new TrelloAPI(token),
		cards = [];

	Trello.getAllCards(token).then(function(cards){
		res.send(cards);
	});
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});