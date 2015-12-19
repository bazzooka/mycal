import React from 'react';
import styles from '../css/App.css';

import {AppBar} from 'material-ui/lib/';


export default class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {test: 'foo'}; 
  }
  render() {
    return (
      <div>
        <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        {this.props.children}
      </div>
    );
  }
}