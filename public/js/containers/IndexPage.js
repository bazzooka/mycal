import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="indexPage">
        <span>IndexPage </span><Link to="bazzooka">bazzooka</Link>
      </div>
    );
  },
});
