import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Replies} from 'components';
import {bindActionCreators} from 'redux';
import * as repliesActionCreators from 'redux/modules/replies';
import {staleReplies} from 'helpers/utils';

class RepliesContainer extends Component {
  componentDidMount() {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId);
    }
  }
  render() {
    return (
      <Replies
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    );
  }
}

RepliesContainer.defaultProps = {
  lastUpdated: 0,
  replies: {}
};

RepliesContainer.propTypes = {
  lastUpdated: PropTypes.number.isRequired,
  replies: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckId: PropTypes.string.isRequired,
  fetchAndHandleReplies: PropTypes.func.isRequired
};

function mapStateToProps({replies}, props) {
  const duckRepliesInfo = replies[props.duckId] || {};

  return {
    isFetching: replies.isFetching,
    error: replies.error,
    lastUpdated: duckRepliesInfo.lastUpdated,
    replies: duckRepliesInfo.replies
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer);
