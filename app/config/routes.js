import React from 'react';
import {Router, hashHistory, IndexRoute, Route} from 'react-router';
import {MainContainer, HomeContainer, AuthenticateContainer,
  FeedContainer, LogoutContainer, UserContainer, DuckDetailsContainer} from 'containers';

function getRoutes(checkAuth) {
  return (
    <Router history={hashHistory}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='feed' component={FeedContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} />
        <Route path='/:uid' component={UserContainer} />
        <Route path='/duckDetail/:duckId' component={DuckDetailsContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  );
}

export default getRoutes;
