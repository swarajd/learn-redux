import { createStore } from 'redux';

//create a counter function
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

//create a store from it
let store = createStore(counter);

//function that renders the state of the store
const render = () => {
  document.body.innerText = store.getState();
}

//whenver the state changes, run render
store.subscribe(render);
render();

//whenever you click on the page, an action is 
//dispatched to the store object and executed
document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT'});
});


