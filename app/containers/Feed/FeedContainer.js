import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Feed} from 'components';
import * as feedActionCreators from 'redux/modules/feed';

class FeedContainer extends Component {
  componentDidMount() {
    this.props.setAndHandleFeedListener();
  }
  render() {
    return (
      <Feed
        newDucksAvailable = {this.props.newDucksAvailable}
        isFetching = {this.props.isFetching}
        error = {this.props.error}
        resetNewDucksAvailable = {this.props.resetNewDucksAvailable}
        duckIds = {this.props.duckIds}
      />
    );
  }
}

FeedContainer.propTypes = {
  duckIds: PropTypes.array.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired
};

function mapStateToProps({feed}) {
  const {newDucksAvailable, isFetching, error, duckIds} = feed;
  return {
    newDucksAvailable,
    isFetching,
    error,
    duckIds
  };
}

function mapDispatchToProps(dispath) {
  return bindActionCreators(feedActionCreators, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
