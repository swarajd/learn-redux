import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import todoApp from './todoUtils';

let store = createStore(todoApp);

console.log(JSON.stringify(store.getState()));

store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'learn redux'
});

console.log(JSON.stringify(store.getState()));
