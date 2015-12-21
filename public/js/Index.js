import React from 'react';
import {Link} from 'react-router';
import Trello from './api/trello';

const Index = React.createClass({

	componentDidMount(){
	
	},

  onLogin () {
    console.log("Try to Login");
    Trello.authorize().then(function(){
      console.log("Already connected");
    });
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
