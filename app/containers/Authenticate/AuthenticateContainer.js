import React, {Component, PropTypes} from 'react';
import {Authenticate} from 'components';
import auth from 'helpers/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActionCreators from 'redux/modules/users';

class AuthenticateContainer extends Component {
  handleAuth() {
   this.props.fetchingUser();
    auth().then(user => {
      this.props.fetchingUserSuccess(user.uid, user, Date.now());
      this.props.authUser(user.uid);
    }).catch(error => this.props.fetchingUserFailure(error));
  }

  render() {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={() => this.handleAuth()}
      />
    );
  }
}

AuthenticateContainer.PropTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isFetching: state.isFetching,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
