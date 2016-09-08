import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Duck} from 'components';

const {object, number, bool, func} = PropTypes;

DuckContainer.propTypes = {
  duck: object.isRequired,
  numberOfLikes: number,
  isLiked: bool.isRequired,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: func.isRequired,
  handleDeleteLike: func.isRequired,
  addAndHandleLike: func.isRequired
};

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true
};

class DuckContainer extends Component {
  render() {
    return (
      <Duck/>
    );
  }
}

function mapStateToProps({ducks, likeCount, usersLikes}, props) {
  const key = props.key;

  return {
    duck: ducks[key],
    numberOfLikes: likeCount[key],
    isLiked: usersLikes[key],
    hideLikeCount: props.hideReplyBtn,
    hideReplyBtn: props.hideReplyBtn
  };
}

export default connect(mapStateToProps)(DuckContainer);
