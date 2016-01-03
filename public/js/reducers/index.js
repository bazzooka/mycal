// import * as ActionTypes from '../actions';
import merge from 'lodash/object/merge';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import { USER_REQUEST_BITBUCKET, USER_SUCCESS_BITBUCKET, USER_FAILURE_BITBUCKET } from '../middleware/bitbucketApi';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {} }, action) {
  if (action.response) {
    const tmp = merge({}, state, { users: { [action.response.login]: action.response } });
    return tmp;
  }

  return state;
}

function entitiesBitbucket(state = { bitbucketUser: {}, userss: {} }, action) {
  if (action.bitbucketResponse) {
    // const tmp = merge({}, state, { bitbucketUser: { [action.bitbucketResponse.username.toLowerCase()]: action.bitbucketResponse } });
    const tmp = merge({}, state, { bitbucketUser: { [action.bitbucketResponse.username.toLowerCase()]: action.bitbucketResponse } });
    return tmp;
  }
  return state;
}


const rootReducer = combineReducers({
  entities,
  entitiesBitbucket,
  router,
});

export default rootReducer;
