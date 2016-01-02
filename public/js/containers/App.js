import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

const App = React.createClass({
  propTypes: {
    // Injected by React Redux
    // errorMessage: PropTypes.string,
    // resetErrorMessage: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    // inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node,
  },

  componentDidMount() {
    //this.handleChange = this.handleChange();
    // this.handleDismissClick = this.handleDismissClick();
  },

  handleDismissClick(e) {
    // this.props.resetErrorMessage();
    e.preventDefault();
  },

  handleChange(nextValue) {
    //this.props.pushState(null, `/${nextValue}`);
  },

  render() {
    const { children } = this.props;
    return (
      <div>
        <div> APP CONTAINER </div>
        {children}
      </div>
    );
  },
});

export default connect(null,
  {
    pushState,
  }
)(App);

// function mapStateToProps(state) {
//   return {
//     errorMessage: state.errorMessage,
//     inputValue: state.router.location.pathname.substring(1)
//   }
// }
//
// export default connect(mapStateToProps, {
//   resetErrorMessage,
//   pushState
// })(App)

// export default App;
