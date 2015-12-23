import React from 'react';
import TrelloCard from './TrelloCard';

const TrelloBoard = React.createClass({
  componentDidMount() {
  },

  render() {
    let cards = this.props.board.map((elt, index)=> {
      return <TrelloCard key={index} card={elt}/>
    })

    return (
    	
      <div>{cards}</div>
	)
  },
});

export default TrelloBoard;
