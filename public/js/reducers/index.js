// import * as ActionTypes from '../actions';
import merge from 'lodash/object/merge';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {} }, action) {
  if (action.response) {
    const tmp = merge({}, state, { users: { [action.response.login]: action.response } });
    return tmp;
  }

  return state;
}


const rootReducer = combineReducers({
  entities,
  router,
});

export default rootReducer;
