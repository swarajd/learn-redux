//import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

//create a counter function, known as a reducer
const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

//created from scratch for learning purposes
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
    return() => {
      listeners = listeners.filter(l => l !== listener);
    }
  } 

  dispatch({});

  return { getState, dispatch, subscribe };
}

//create a store from it
let store = createStore(counter);

//function that renders the state of the store
const render = () => {
  ReactDOM.render(
    //you can add properties to the component, in this case both are being overriden
    <App value={store.getState()} 
      onIncrement={() => {
        store.dispatch({
          type: 'INCREMENT'
        })
      }} 
      onDecrement={() => {
        store.dispatch({
          type: 'DECREMENT'
        })
      }}/>,
    document.getElementById('app')
  );
}

//whenver the state changes, run render
store.subscribe(render);
render();


