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

// a small component that sets the store's visibility filter
const FilterLink = ({
  filter,
  children,
}) => {
  return (
    <a href="#"
       onClick={e => {
         e.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         })
       }}
    >
      {children}
    </a>
  )
}

// a function that gets all the relevant todos based on the filter from the store
const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
    default:
      return todos;
  };
}

//I guess we need the class in here...
let nextTodoId = 0;
class App extends React.Component {
  render() {
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    );
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
          {visibleTodos.map(todo =>
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
        <p>
          Show:
          {' '}
          <FilterLink
            filter="SHOW_ALL"
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_ACTIVE"
          >
            Active
          </FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_COMPLETED"
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <App
      {...store.getState()}
    />,
    document.getElementById('app')
  );
}

store.subscribe(render);
render();
