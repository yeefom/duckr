import React, {Component, PropTypes} from 'react';
import {container, innerContainer} from './styles.css';
import {connect} from 'react-redux';
import {Navigation} from 'components';

class MainContainer extends Component {
  render() {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired
};

export default connect(
  state => ({isAuthed: state.isAuthed})
)(MainContainer);
