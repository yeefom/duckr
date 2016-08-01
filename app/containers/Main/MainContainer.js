import React, {Component, PropTypes} from 'react';
import {container, innerContainer} from './styles.css';
import {connect} from 'react-redux';
import {Navigation} from 'components';
import {bindActionCreators} from 'redux';
import * as userActionCreators from 'redux/modules/users';
import {formatUserInfo} from 'helpers/utils';
import {firebaseAuth} from 'config/constants';

class MainContainer extends Component {
  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      // user exists if authed
      if (user) {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid);
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());
        this.props.authUser(user.uid);
        if (this.props.location.pathName === '/') {
          this.context.router.replace('feed');
        }
      } else {
        this.props.removeFetchingUser();
      }
    });
  }
  render() {
    return this.props.isFetching === true
    ? null
    : <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>;
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired
};

MainContainer.contextType = {
  router: PropTypes.object.isRequired
};

export default connect(
  state => ({isAuthed: state.isAuthed, isFetching: state.isFetching}),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(MainContainer);
