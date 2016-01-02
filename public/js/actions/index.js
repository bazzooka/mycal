import { CALL_API } from '../middleware/api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';


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
