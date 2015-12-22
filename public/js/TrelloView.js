import React from 'react';
import Error from './Error';
import Trello from './api/trello';
import TrelloBoard from './TrelloBoard';

const TrelloView = React.createClass({
  getInitialState() {
    return {}
  },

  componentDidMount: function() {
    var me = this;

    Trello.getAllCards().then((boards)=> {
      this.setState({boards: boards})
    }).catch((err)=> {
      if (err === Error.Trello.INVALID_TOKEN) {
        Trello.deauthorize();
        this.props.history.pushState(null, '/', null);
      }
    });
  },

  render: function() {
    if (!this.state.boards) {
      return <div>No board</div>
    }

    let boardsElts = Object.keys(this.state.boards).map((key)=>{
    	return <TrelloBoard key={key} board={this.state.boards[key]}/>
    });

    return (
	    <div className="trello-boards">
	    	{boardsElts}
	    </div>
    )
  },
});

export default TrelloView;
