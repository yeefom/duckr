import React, {PropTypes} from 'react';
import {avatar, replyContainer, header,
  cushion, center, author} from './styles.css';
import { errorMsg } from 'sharedStyles/styles.css';
import {formatTimestamp} from 'helpers/utils';

Reply.propTypes = {
  comment: PropTypes.object.isRequired
};

function Reply ({comment}) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar} />
      <div>
        <div className={author}>{comment.name}</div>
        <div className={cushion}>{formatTimestamp(comment.timestamp)}</div>
        <div className={cushion}>{comment.reply}</div>
      </div>
    </div>
  );
}

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object
};

export default function Replies({isFetching, error, replies}) {
  const replyIds = Object.keys(replies);

  return (
    <div>
      {error ? <h3 className={errorMsg}>{error}</h3> : null}
      {isFetching
        ? <p>{'Fetching Replies'}</p>
        : <div>
            <h1 className={header}>{'Replies'}</h1>
            {replyIds.map(replyId => <Reply key={replyId} comment={replies[replyId]} />)}
          </div>
      }
      {!replyIds.length
        ? <h3 className={center}>{'Be the one to eliminate 0 comment.'}</h3>
        : null
      }
    </div>
  );
}
