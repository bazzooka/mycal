import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import IndexPage from './containers/IndexPage';
import LoginPage from './containers/LoginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute
      component={IndexPage}
    />
    <Route
      path="/:login"
      component={LoginPage}
    />
  </Route>
);
