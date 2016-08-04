import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import getRoutes from './config/routes';
import thunk from 'redux-thunk';
import {checkIfAuthed} from './helpers/auth';
import * as reducers from 'redux/modules';


const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

function checkAuth(nextState, replace) {
  if (!store.getState().users.isFetching) {
    const isAuthed = checkIfAuthed(store);
    const nextPathName = nextState.location.pathname;
    if (nextPathName === '/' || nextPathName === '/auth') {
      if (isAuthed) {
        replace('/feed');
      }
    } else {
      if (isAuthed !== true) {
        replace('/auth');
      }
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
);
