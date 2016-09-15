import React, {Component, PropTypes} from 'react';
import {User} from 'components';

class UserContainer extends Component {
  render() {
    return (
      <User/>
    );
  }
}

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired
};

export default UserContainer;
