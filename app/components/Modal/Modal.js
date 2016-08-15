import React, {PropTypes} from 'react';
import {default as ReactModal} from 'react-modal';
import {newDuckTop, pointer, newDuckInputContainer, newDuckInput, darkBtn, submitDuckBtn} from './styles.css';
import {formatDuck} from 'helpers/utils';

const {object, string, func, bool} = PropTypes;

Modal.propTypes = {
  duckText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDuckText: func.isRequired,
  duckFanout: func.isRequired
};

const modalStyles = {
  content: {
    width: '350px',
    margin: '0px auto',
    height: '220px',
    borderRadius: '5px',
    background: '#ebebeb',
    padding: 0
  }
};

export default function Modal(props) {
  function submitDUck() {
    props.duckFanout(formatDuck(props.duckText, props.user));
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'Duck'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className={newDuckTop}>
          <span>{'Compose'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={e => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placholder={'What\'s happening'}
          />
        </div>
        <button className={submitDuckBtn} disabled={props.isSubmitDisabled} onClick={submitDUck}>
          {'Duck'}
        </button>
      </ReactModal>
    </span>
  );
}
