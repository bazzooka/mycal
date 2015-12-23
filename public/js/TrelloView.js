import React from 'react';
import Error from './Error';
import Trello from './api/trello';
import MyDb from './api/mydb';

import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Toggle from 'material-ui/lib/toggle';

const TrelloView = React.createClass({
  getInitialState() {
    return {}
  },

  componentDidMount: function() {
    let me = this,
    _boards = [];


    Trello.getAllCards().then((boards)=> {
      _boards = boards;
    }).then(()=> {
      MyDb.downloadTrellosInDb(Trello.getToken(), "Joe");
    }).then(()=> {
      this.setState({boards: _boards});
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
      console.log(this.state.boards[key])
    	return <ListItem
                primaryText={this.state.boards[key].board.name}
                rightToggle= {<Toggle
                                  name="toggleBoard"
                                  value="toggleValue1"/>}
                key={key} />
                
    });

    return (
	    <div className="trello-boards">
	    	<List subheader="">
          {boardsElts}
        </List>
	    </div>
    )
  },
});

export default TrelloView;
