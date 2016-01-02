import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './App.js';
import Index from './Index.js';
import Calendar from './Calendar.js';
import TrelloView from './TrelloView.js';
import NoMatch from './NoMatch.js';


ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path="/calendar" component={Calendar} />
			<Route path="/trello" component={TrelloView} />
			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
	, document.getElementById('root')
);
