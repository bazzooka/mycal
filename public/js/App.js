import React from 'react';
import '../css/App.css';

import { AppBar } from 'material-ui/lib/';


// export default class App extends React.Component {
const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },

  getInitialState() {
    return { test: 'foo' };
  },

  render() {
    return (
      <div>
        <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        { this.props.children }
      </div>
    );
  },
});

export default App;
