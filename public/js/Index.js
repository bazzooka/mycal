import React from 'react';
import {Link} from 'react-router';
import Trello from './api/trello';

const Index = React.createClass({

  getInitialState(){
    return {trello: false};
  },

	componentDidMount(){
    Trello.getUserInfos().then((results) => {
      this.setState({trello: true});
    }).catch((err) => {
      this.setState({trello: false});
    })
	},

  onLogin () {
    console.log("Try to Login");
      Trello.getAllCards().then(function(boards){
        console.log(boards);
      })
  },

	render() {
    let trelloLogin = <div>{this.state.login ? "Logout": "Login" }</div>;
    return (
      <div className="api-container">
        {trelloLogin}
      </div>
    )
  },
});

export default Index;
