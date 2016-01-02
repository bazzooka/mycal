import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
// import DevTools from './DevTools';

export default React.createClass({
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <ReduxRouter />

        </div>
      </Provider>
    );
  },
  propTypes: {
    store: PropTypes.object.isRequired,
  },
});
