import React, {PropTypes} from 'react';
import {DuckContainer} from 'containers';
import {mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea} from './styles.css';
import {subHeader, darkBtn, errorMsg} from 'sharedStyles/styles.css';
import {formatReply} from 'helpers/utils';

function Reply({submit}) {
  function handleSubmit() {
    if (Reply.ref.value.length) {
      submit(Reply.ref.value);
      Reply.ref.value = '';
    }
  }

  return (
    <div className={replyTextAreaContainer}>
      <textarea
        ref={e => Reply.ref = e}
        className={replyTextArea}
        maxLength={140}
        placeholder='Your response'
        type='text'
      />
      <button
        className={darkBtn}
        onClick={handleSubmit}
      >
        {'Submit'}
      </button>
    </div>
  );
}

DuckDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
};

export default function DuckDetails({duckId, isFetching, authedUser, error, addAndHandleReply}) {
  function submit(replyText) {
    addAndHandleReply(duckId, formatReply(authedUser, replyText));
  }

  return (
    <div className={mainContainer}>
      {isFetching
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
            <div className={content}>
              <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true} />
              <Reply submit={submit}/>
            </div>
            <div className={repliesContainer}>
              {'REPLIES'}
            </div>
          </div>
      }
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  );
}
