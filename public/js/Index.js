import React from 'react';
import {Link} from 'react-router';
import Trello from './api/trello';

const Index = React.createClass({

	componentDidMount(){
		this.deferred = {};
		this.ready = {};
	},

	// waitUntil (name, fx) {
 //  		var _ref;
 //  		if (this.ready[name] != null) {
 //    		return fx(this.ready[name]);
 //  		} else {
 //    		return ((_ref = this.deferred[name]) != null ? _ref : this.deferred[name] = []).push(fx);
 //  		}
	// },

	// __bind (fn, me) {
	// 	return function() {
	// 		return fn.apply(me, arguments);
	// 	};
	// },

	// onAuthorize : function() {
	// 	console.log(arguments);
	// },
	
	// onLogin(){
  //   	var key= "4f66406ccbbdd37004e985b4e6100eb8";
  //   	var ref1 = null;
  //   	var origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(location)) != null ? ref1[0] : void 0;
		// var scope = "&read%2Cwrite";

  //   	var authorizeUrl = "https://trello.com" + "/" + 1 + "/authorize?";
  //   	authorizeUrl += "response_type=token";
  //   	authorizeUrl += "&key=" + key;
  //   	authorizeUrl +="&return_url=" + origin;
  //       authorizeUrl += "&callback_method=postMessage";
  //       authorizeUrl += "&success=postMessage";
  //       authorizeUrl += "&scope=" +  scope,
  //       authorizeUrl += "&expiration=" + "30days";
  //       authorizeUrl += "&name=" + "MyCal";

  //       this.postMessage = function(){
  //       	console.log(arguments);
  //       }

  //       var width = 420,
  //           height = 470,
  //           left = window.screenX + (window.innerWidth - width) / 2,
  //           top = window.screenY + (window.innerHeight - height) / 2;

  //       this.waitUntil("authorized", __bind(function(isAuthorized) {
  //         console.log(arguments);
  //       }, this));

  //       var authResponse = window.open(authorizeUrl, "trello", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);

//   Trello.authorize({
//     interactive:false,
//     success: onAuthorize
// });

// 	},

  onLogin () {
    console.log("Try to Login");
    Trello.authorize();
  },

	render() {
	    return (
	    	<div>
	    		<div onClick={this.onLogin}>
	    			LOGIN
	    		</div>
			</div>
	    )
  	},
});

export default Index;
