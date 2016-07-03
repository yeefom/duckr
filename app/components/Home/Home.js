import React, {PropTypes} from 'react';
import {container, title, slogan} from './styles.css';

function Home() {
  return (
    <div className={container}>
      <p className={title}>{'Duckr'}</p>
      <p className={slogan}>{'Twitter clone with Redux'}</p>
    </div>
  );
}
export default Home;
