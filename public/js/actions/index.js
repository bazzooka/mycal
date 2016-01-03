import { CALL_API } from '../middleware/api';
import { CALL_API_B } from '../middleware/bitbucketApi';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export const USER_REQUEST_BITBUCKET = 'USER_REQUEST_BITBUCKET';
export const USER_SUCCESS_BITBUCKET = 'USER_SUCCESS_BITBUCKET';
export const USER_FAILURE_BITBUCKET = 'USER_FAILURE_BITBUCKET';


export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      endpoint: `users/${login}`,
      // schema: Schemas.USER
    },
  };
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadUser(login) {
  return (dispatch, getState) => {
    // const user = getState().entities.users[login]
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }
    // console.log('Action loadUser', getState());

    return dispatch(fetchUser(login));
  };
}

function fetchBitbucketUser(login) {
  return {
    [CALL_API_B]: {
      types: [USER_REQUEST_BITBUCKET, USER_SUCCESS_BITBUCKET, USER_FAILURE_BITBUCKET],
      endpoint: `users/${login}`,
    },
  };
}

export function loadBitbucketUser(login) {
  return (dispatch, getState) => {
    return dispatch(fetchBitbucketUser(login));
  }
}
