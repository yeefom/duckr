import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {User} from 'components';
import {bindActionCreators} from 'redux';
import * as usersActionCreators from 'redux/modules/users';
import * as usersDucksActionCreators from 'redux/modules/usersDucks';
import {staleUser, staleDucks} from 'helpers/utils';

class UserContainer extends Component {
  componentDidMount() {
    const uid = this.props.routeParams.uid;

    if (this.props.noUser || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid);
    }

    if (this.props.duckIds || staleDucks(this.props.lastUpdatedDucks)) {
      this.props.fetchAndHandleUsersDucks(uid);
    }
  }
  render() {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds}
      />
    );
  }
}

UserContainer.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
  lastUpdatedUser: PropTypes.number.isRequired,
  lastUpdatedDucks: PropTypes.number.isRequired
};

function mapStateToProps({users, usersDucks}, props) {
  const uid = props.routeParams.uid;
  const user = users[uid];
  const ducks = usersDucks[uid];

  return {
    noUser: !user,
    name: user ? user.info.name : '',
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    duckIds: ducks ? ducks.duckIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedDucks: ducks ? ducks.lastUpdated : 0
  };
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersDucksActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispathToProps)(UserContainer);
