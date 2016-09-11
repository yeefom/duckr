import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Duck} from 'components';
import * as usersLikesActions from 'redux/modules/usersLikes';

const {object, number, bool, func} = PropTypes;

class DuckContainer extends Component {
  goToProfile(e) {
    e.stopPropagation();
    this.context.router.push('/' + this.props.duck.uid);
  }
  handleClick(e) {
    e.stopPropagation();
    this.context.router.push('/duckDetail/' + this.props.duck.duckId);
  }
  render() {
    return (
      <Duck
        goToProfile = {e => this.goToProfile(e)}
        handleClick = {this.props.hideReplyBtn ? null : e => this.handleClick(e)}
        {...this.props}
      />
    );
  }
}

DuckContainer.propTypes = {
  duck: object.isRequired,
  numberOfLikes: number,
  isLiked: bool.isRequired,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  handleDeleteLike: func.isRequired,
  addAndHandleLike: func.isRequired
};

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true
};

DuckContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps({ducks, likeCount, usersLikes}, props) {
  const duckId = props.duckId;

  return {
    duck: ducks[duckId],
    numberOfLikes: likeCount[duckId],
    isLiked: usersLikes[duckId] === true,
    hideLikeCount: props.hideReplyBtn,
    hideReplyBtn: props.hideReplyBtn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(usersLikesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckContainer);
