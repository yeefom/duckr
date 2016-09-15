import React, {PropTypes} from 'react';
import {errorMsg} from 'shared/Styles/styles.css';
import {userContainer, header} from './styles.css';
import {DuckContainer} from 'containers/DuckContainer';

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired
};

export default function User(props) {
  return (
    props.noUser
      ? <p className={header}>{'User does not exist'}</p>
      : <div>
          {props.isFetching
            ? <p className={header}>{'Loading'}</p>
            : <div>
                <div className={userContainer}>{props.name}</div>
                {props.duckIds.map(id => <DuckContainer key={id} duckId={id}/>)}
                {props.duckIds.length
                  ? <p className={header}>
                      {`${props.name.split(' ')[0]} hasn't ducked yet.`}
                    </p>
                  : null
                }
              </div>
          }
          {props.error ? <p className={errorMsg}>{props.error}</p> : null}
        </div>
  );
}
