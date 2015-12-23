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

  onLoginOut (){
    if(this.state.trello){
      Trello.deauthorize();
      this.setState({trello: false});
    } else {
      Trello.authorize().then(()=>{
        this.setState({trello: true});
      }).catch((err)=>{
        Trello.deauthorize();
        console.log("An error happened. Try again later...");
      })
    }
  },

	render() {
    let trelloLogin = <div onClick={this.onLoginOut}>{this.state.trello ? "Logout": "Login" }</div>;
    return (
      <div className="api-container">
        {trelloLogin}
      </div>
    )
  },
});

export default Index;
