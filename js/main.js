import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App'
import todoApp from './todoUtils';

let store = createStore(todoApp);

// console.log(JSON.stringify(store.getState()));
//
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'learn redux'
// });
//
// console.log(JSON.stringify(store.getState()));

//I guess we need the class in here...
let nextTodoId = 0;
class App extends React.Component {
  render() {
    return (
      <div>
        <input ref={node => {
            this.input = node;
        }} />
        <button onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++
            });
            this.input.value = '';
          }}>
            Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                });
              }}
              style={{
                textDecoration:
                  todo.completed ?
                    'line-through' :
                    'none'
              }}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <App
      todos={store.getState().todos}
    />,
    document.getElementById('app')
  );
}

store.subscribe(render);
render();
