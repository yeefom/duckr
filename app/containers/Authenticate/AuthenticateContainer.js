import React, {Component, PropTypes} from 'react';
import {Authenticate} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActionCreators from 'redux/modules/users';

class AuthenticateContainer extends Component {
  handleAuth(e) {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('feed'));
  }

  render() {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={e => this.handleAuth(e)}
      />
    );
  }
}

AuthenticateContainer.PropTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired
};

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps({users}) {
  return {
    isFetching: users.isFetching,
    error: users.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
