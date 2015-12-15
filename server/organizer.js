var TrelloAPI = require('./trello');

var Organizer = function(db, userId){
	this._db = db;
	this._userId = userId;
};

TrelloAPI.prototype.getCardsForUser = function(db, userId){
	
}


Organizer.prototype.getTrelloCards = function(){
	var me = this;
	return new Promise(function(resolve, reject){
		me._db.collection('trellos').find({userId: me._userId}).toArray(function(err, results){
			if(err){
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
}

Organizer.prototype.organize = function(){

	this.getTrelloCards().then(function(results){
		
	});
}

module.exports = Organizer;