var Trello = require("node-trello");
var Promise = require('promise');
var TRELLO_KEY = "4f66406ccbbdd37004e985b4e6100eb8";


var TrelloAPI = function(userToken){
	this._userToken = userToken;
	this._t = new Trello(TRELLO_KEY, this._userToken);
}

/**
 * Get user infos
 */
TrelloAPI.prototype.getUserInfos = function() {
	var me = this;
	return new Promise(function(resolve, reject){
		me._t.get("/1/members/me", function(err, data){
			if(err){
				reject(new Error(err));
			} else {
				resolve(data);
			}
		});
	});
};

/**
 * Get cards from board by board id
 */
TrelloAPI.prototype.getCardsFromBoardId = function(boardId) {
	var me = this;
	return new Promise(function(resolve, reject){
		me._t.get("/1/boards/" + boardId + "/cards/", function(err, data){
			if(err){
				reject(new Error(err));
			} else {
				resolve(data);
			}
		});
	});
};

/**
 * Get all user cards
 */
TrelloAPI.prototype.getAllCards= function(){
	var me = this, cards = [];
	return me.getUserInfos().then(function(boards){
		return boards.idBoards.reduce(function(sequence, boardId){
			return sequence.then(function(){
				return me.getCardsFromBoardId(boardId);
			}).then(function(_cards){
				return cards = cards.concat(_cards);
			});
		}, Promise.resolve());
	});
}

TrelloAPI.prototype.dropTrellos = function(db){ 
	return new Promise(function(resolve, reject){
		db.collection('trellos').drop(function(err, response){
			if(!err || (err && err.message === "ns not found")){
				resolve(response);
			} else {
				reject(err);
			}
		})
	})
}

TrelloAPI.prototype.addCardsInDb = function(db, cards){
	return new Promise(function(resolve, reject){
		db.collection('trellos').insert(cards, function(err, result){
			if(err){
				reject(err);
			} else {
				resolve(result);
			}
		});
	})	
};




module.exports = TrelloAPI;