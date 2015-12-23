/* eslint no-console: 0 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var httpProxy = require('http-proxy');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

//var config = require('./webpack.config.js')(process.env.NODE_ENV !== 'production');
var config = require('./webpack.config.js')

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3005 : process.env.PORT;

var app = express();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var TrelloAPI = require("./server/trello");
var Organizer = require("./server/organizer");

var MyTrelloAPI = null;
var db;

if (isDeveloping) {
  var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
  });

  app.all('/api/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:3006'
    });
  });
}

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tests', function(req, res) {
  res.send("Test");
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
  var boards = req.body.boards;

  var boardsObj = JSON.parse(boards);

  res.send('OK');
})

if (isDeveloping) {
  var compiler = webpack(config);
  var middleware = webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  });
  app.use(middleware);

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.get('*', function response(req, res) {
    console.log(req.originalUrl);
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  var compiler = webpack(config);
  console.log(compiler);

  //app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}



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

