//counter utilities

//add a counter to the list of counters
const addCounter = (list) = > {
  return [...list, 0];
}

//remove a counter at a specified index
//from a list of counters
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index+1)
  ];
}

//increment a counter at a certain index
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
}

//decrement a counter at a certain index
const decrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] - 1,
    ...list.slice(index + 1)
  ];
}

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

//whenver the state changes, run render
store.subscribe(render);
render();

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