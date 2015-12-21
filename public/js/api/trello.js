var Trello = {
  opts: {
    "version":1,
    "apiEndpoint":"https://api.trello.com",
    "authEndpoint":"https://trello.com",
    "intentEndpoint":"https://trello.com",
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

  authorize :  function() {
	let regexToken = /[&#]?token=([0-9a-f]{64})/,
		token = null, opts = {};

	var k, persistToken, ref, scope, v;
	
	Object.assign(opts, {
		type: "popup"
		persist: true,
		interactive: true,
		scope: {
		  read: true,
		  write: true,
		  account: false,
		},
		expiration: "30days",
	});

      
    if (token == null) {
      token = readStorage("token");
    }

	// if (token == null) {
	//    token = (ref = regexToken.exec(location.hash)) != null ? ref[1] : void 0;
	// }

      // if (this.authorized()) {
      //   persistToken();
      //   location.hash = location.hash.replace(regexToken, "");
      //   return typeof opts.success === "function" ? opts.success() : void 0;
      // }

      console.log("Check is authorized");

      // if (!opts.interactive) {
      //   return typeof opts.error === "function" ? opts.error() : void 0;
      // }

      scope = ((function() {
        var ref1, results;
        ref1 = opts.scope;
        results = [];
        for (k in ref1) {
          v = ref1[k];
          if (v) {
            results.push(k);
          }
        }

        return results;
      })()).join(",");

      
      switch (opts.type) {
        case "popup":
          (function() {
            var height, left, origin, ref1, top, width;
            waitUntil("authorized", (function(_this) {
              return function(isAuthorized) {
                if (isAuthorized) {
                  persistToken();
                  return typeof opts.success === "function" ? opts.success() : void 0;
                } else {
                  return typeof opts.error === "function" ? opts.error() : void 0;
                }
              };
            })(this));
//https://trello.com/1/authorize?response_type=token&key=00f1dd1e00000f1dd1e00000f1dd1e00&return_url=http%3A%2F%2Ffiddle.jshell.net&callback_method=postMessage&scope=read&expiration=30days
            width = 420;
            height = 470;
            left = window.screenX + (window.innerWidth - width) / 2;
            top = window.screenY + (window.innerHeight - height) / 2;
            origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(location)) != null ? ref1[0] : void 0;
            return window.open(authorizeURL({
              return_url: origin,
              callback_method: "postMessage",
              scope: scope,
              expiration: opts.expiration,
              name: opts.name,
            }), "trello", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
          })();

          break;
        default:
          window.location = authorizeURL({
            redirect_uri: location.href,
            callback_method: "fragment",
            scope: scope,
            expiration: opts.expiration,
            name: opts.name,
          });
      }
    }

}

export default Trello;
