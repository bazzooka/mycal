import React from 'react';
import {Link} from 'react-router';
import Trello from './api/trello';

const Index = React.createClass({

	componentDidMount(){
	
	},

  onLogin () {
    console.log("Try to Login");
      Trello.getAllCards().then(function(boards){
        console.log(boards);
      })
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
