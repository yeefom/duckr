import React, {Component, PropTypes} from 'react';
import {DuckDetails} from 'components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as duckActionCreators from 'redux/modules/ducks';
import * as likeCountActionCreators from 'redux/modules/likeCount';
import * as repliesActionCreators from 'redux/modules/replies';

class DuckDetailsContainer extends Component {
  componentDidMount() {
    this.props.initLikeFetch(this.props.duckId);

    if (this.props.duckFetched) {
      this.props.removeFetching();
    } else {
      this.props.fetchAndHandleDuck();
    }
  }
  render() {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error}
        addAndHandleReply={this.props.addAndHandleReply}
      />
    );
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckFetched: PropTypes.bool.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
};

function mapStateToProps({ducks, likeCount, users}, props) {
  const duckId = props.routeParams.duckId;

  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId,
    duckFetched: !!ducks[duckId]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckDetailsContainer);
