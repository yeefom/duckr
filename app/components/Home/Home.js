import React from 'react';
import {container, title, slogan} from './styles.css';

function Home() {
  return (
    <div className={container}>
      <p className={title}>{'Duckr'}</p>
      <p className={slogan}>{'When Redux Met Twitter'}</p>
    </div>
  );
}
export default Home;
