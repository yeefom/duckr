import React, {PropTypes} from 'react';
import {button} from './styles.css';

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

function FacebookAuthButton({onAuth, isFetching}) {
  return (
    <button onClick={onAuth} className={button}>
      {isFetching ? 'Loading' : 'Login with Facebook'}
    </button>
  );
}
export default FacebookAuthButton;
