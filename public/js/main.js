import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './App.js';
import Index from './Index.js';
import NoMatch from './NoMatch.js';


ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
	, document.getElementById('root')
);