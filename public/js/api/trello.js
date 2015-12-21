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
  }
}

export default Trello;
