import 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

export const CALL_API_B = Symbol('Call API Bitbucket');
const API_ROOT = 'https://bitbucket.org/api/2.0/';

function callApi(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      // const nextPageUrl = getNextPageUrl(response);

      return Object.assign(
        {},
        camelizedJson
      //   // normalize(camelizedJson, schema),
      );
    });
}

export default store => next => action => {
  const callAPI = action[CALL_API_B];

  if (typeof(callAPI) === 'undefined') {
    return next(action);
  }
  const { endpoint, types } = callAPI;

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API_B];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint).then(
    response => next(actionWith({
      bitbucketResponse: response,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    }))
  );



};
