import React, {PropTypes} from 'react';
import {newDuckContainer, header} from './styles.css';
import {errorMsg} from 'sharedStyles/styles.css';
import {DuckContainer} from 'containers';

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired
};

function NewDucksAvailable({handleClick}) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      {'New Ducks Available'}
    </div>
  );
}

Feed.propTypes = {
  duckIds: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired
};

function Feed(props) {
  return props.isFetching
    ? <h1 className={header}>{'Fetching'}</h1>
    : <div>
        {
          props.newDucksAvailable
            ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable}/>
            : null
        }
        {
          props.duckIds.length === 0
            ? <p className={header}>{'No ducks available'}</p>
            : null
        }
        { props.duckIds.map(id => <DuckContainer key={id} duckId={id}/>) }
        {
          props.error
            ? <p className={errorMsg}>{props.error}</p>
            : null
        }
      </div>;
}

export default Feed;
