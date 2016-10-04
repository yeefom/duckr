import React, {Component, PropTypes} from 'react';
import {DuckDetails} from 'components';
import {connect} from 'redux';

class DuckDetailsContainer extends Component {
  render() {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    );
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

function mapStateToProps({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId
  };
}

export default connect(mapStateToProps)(DuckDetailsContainer);
