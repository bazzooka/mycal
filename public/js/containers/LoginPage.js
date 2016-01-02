import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions';
// import zip from 'lodash/array/zip';

function loadData(props) {
  const { login } = props;
  props.loadUser(login);
}

const LoginPage = React.createClass({
// class LoginPage extends Component {
  propTypes: {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,
      // starredPagination: PropTypes.object,
      // starredRepos: PropTypes.array.isRequired,
      // starredRepoOwners: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
      // loadStarred: PropTypes.func.isRequired,
  },

  componentWillMount() {
    loadData(this.props);
  },

  componentDidMount() {
    // this.renderRepo = this.renderRepo.bind(this);
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  },

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.login !== this.props.login) {

    }
  },

  handleLoadMoreClick() {
    // this.props.loadStarred(this.props.login, true);
  },

  // render() {
  //   const { user, login } = this.props
  //   if (!user) {
  //     return <h1><i>Loading {login}’s profile...</i></h1>
  //   }
  //
  //   const { starredRepos, starredRepoOwners, starredPagination } = this.props
  //   return (
  //     <div>
  //       <User user={user} />
  //       <hr />
  //       <List renderItem={this.renderRepo}
  //             items={zip(starredRepos, starredRepoOwners)}
  //             onLoadMoreClick={this.handleLoadMoreClick}
  //             loadingLabel={`Loading ${login}’s starred...`}
  //             {...starredPagination} />
  //     </div>
  //   )
  // }

  render() {
    this.props.user && console.log(this.props.user);
    return (
      <div>LOGIN PAGE CONTAINER</div>
    );
  },
});

// function mapStateToProps(state) {
//   const { login } = state.router.params
//   const {
//     pagination: { starredByUser },
//     entities: { users, repos }
//   } = state
//
//   const starredPagination = starredByUser[login] || { ids: [] }
//   const starredRepos = starredPagination.ids.map(id => repos[id])
//   const starredRepoOwners = starredRepos.map(repo => users[repo.owner])
//
//   return {
//     login,
//     starredRepos,
//     starredRepoOwners,
//     starredPagination,
//     user: users[login]
//   }
// }
//
// export default connect(mapStateToProps, {
//   loadUser,
//   loadStarred
// })(UserPage)

function mapStateToProps(state) {
  const { login } = state.router.params;
  const {
      entities: { users, repos },
  } = state;

  return {
    login,
    user: users[login],
  };
}

export default connect(
  mapStateToProps,
  {
    loadUser,
  }
)(LoginPage);

// export default LoginPage;
