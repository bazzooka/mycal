import request from 'superagent';

var Trello = {
  opts: {
    "version":1,
    "apiEndpoint":"https://api.trello.com",
    "authEndpoint":"https://trello.com",
    "intentEndpoint":"https://trello.com",
    "key": "4f66406ccbbdd37004e985b4e6100eb8",
  },
  localStorage: window.localStorage,
  storagePrefix: "trello_",

  writeStorage: function(key, value) {
    if (value === null) {
      return delete this.localStorage[this.storagePrefix + key];
    } else {
      return this.localStorage[this.storagePrefix + key] = value;
    }
  },

  readStorage: function(key) {
    return this.localStorage[this.storagePrefix + key];
  },

  persistToken: function(token) {
    if (token != null) {
      return this.writeStorage("token", token);
    }
  },

  getScope: function(scope) {
    var ref1, results, k, v, ref1 = scope,
    results = [];

    for (k in ref1) {
      v = ref1[k];
      if (v) {
        results.push(k);
      }
    }

    return results.join(",");
  },

  deauthorize: function(){
    this.writeStorage("token", null);
  },

  authorize:  function() {
    return new Promise(function(resolve, reject) {
      let regexToken = /[&#]?token=([0-9a-f]{64})/,
      ref1 = null,
        origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(location)) != null ? ref1[0] : void 0,
        token = null, opts = {}, scope = "",
        authorizeURL = "";

      window.addEventListener("message", function(event) {
        var _ref3;

        if (event.origin !== this.opts.authEndpoint) {
          return true;
        }

        if ((_ref3 = event.source) != null) {
          _ref3.close();
        }

        console.log(event);
        this.persistToken(event.data);
        resolve("OK");
      }.bind(this));

      Object.assign(opts, {
        type: "popup",
        persist: true,
        interactive: true,
        scope: {
          read: true,
          write: true,
          account: false,
        },
        expiration: "30days",
      });

      if (token === null) {
        token = this.readStorage("token");
      }

      if (token != null) {
        resolve("OK");
        return true;
      }

      scope = this.getScope(opts.scope);

      var authorizeUrl = "https://trello.com" + "/" + 1 + "/authorize?";
      authorizeUrl += "response_type=token";
      authorizeUrl += "&key=" + this.opts.key;
      authorizeUrl += "&return_url=" + origin;
      authorizeUrl += "&callback_method=postMessage";
      authorizeUrl += "&success=postMessage";
      authorizeUrl += "&scope=" +  scope,
      authorizeUrl += "&expiration=" + "30days";
      authorizeUrl += "&name=" + "MyCal";

      var width = 420,
        height = 470,
        left = window.screenX + (window.innerWidth - width) / 2,
        top = window.screenY + (window.innerHeight - height) / 2;

      if (opts.type) {
        (function() {
          var height, left, origin, ref1, top, width;
          width = 420;
          height = 470;
          left = window.screenX + (window.innerWidth - width) / 2;
          top = window.screenY + (window.innerHeight - height) / 2;
          origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(location)) != null ? ref1[0] : void 0;
          return window.open(authorizeUrl, "trello", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
        })();
      }
    }.bind(this));
  },

  isAuthorized: function(){
    return this.readStorage("token") != null;
  },

  getBoards: function(){
    return new Promise((resolve, reject) => {
      if(this.isAuthorized){
        request.get(this.opts.apiEndpoint + "/" + this.opts.version + "/members/me/boards")
          .query({"key": this.opts.key})
          .query({"token": this.readStorage("token")})
          .accept('application/json')
          .end(function(err, results){
            if(err){
              reject(err);
            } else {
              resolve(results);
            }
          });
      } else {
        reject("Not authenticated");
      }
    });
  },

  getCardsFromBoard: function(board){
    return new Promise((resolve, reject) => {
      if(this.isAuthorized){
        request.get(this.opts.apiEndpoint + "/" + this.opts.version + "/boards/"+board.id+"/cards/")
          .query({"key": this.opts.key})
          .query({"token": this.readStorage("token")})
          .accept('application/json')
          .end(function(err, results){
            if(err){
              reject(err);
            } else {
              resolve(results);
            }
          });
      } else {
        reject("Not authenticated");
      }
    });
  },

  getAllCards: function(){
    return new Promise((resolve, reject) => {
      let _boards = []
      if(this.isAuthorized){
        this.getBoards().then((boards) => {
          let boardId = boards.body.id;
          return boards.body.map(this.getCardsFromBoard.bind(this))
            .reduce((sequence, cardPromise) => {
              return sequence.then(() => {
                return cardPromise;
              }).then((cards) => {
                if(cards.body && cards.body.length > 0){
                  _boards[cards.body[0].idBoard] = cards.body;
                }
              })
            }, Promise.resolve());
        }).then(function(){
          resolve(_boards);
        }).catch((err) => {
          if("invalid token" === err.response.text){
            this.deauthorize();
            reject("Invalid Trello token.")
          }
        });
      }
    });
  }
}

export default Trello;
