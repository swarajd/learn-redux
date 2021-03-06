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
const Link = ({
  active,
  children,
  onClick,
}) => {
  if (active) {
    return <span> {children} </span>
  }
  return (
    <a href="#"
       onClick={e => {
         e.preventDefault();
         onClick();
       }}
    >
      {children}
    </a>
  )
}

class FilterLink extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    )
  }
}

//extract the todo component
const Todo = ({
  onClick,
  completed,
  text,

}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}>
    {text}
  </li>
)

//extract the todo LIST component
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

//extract the addTodo component
const AddTodo = ({
  onAddClick
}) => {
  let input;

  return (
    <div>
      <input ref={node => {
          input = node;
      }} />
      <button onClick={() => {
          onAddClick(input.value);
          input.value = '';
        }}>
          Add Todo
      </button>
    </div>
  )
}

//extract the footer (which filters the todos)
const Footer = () => (
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
)

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
const App = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo
      onAddClick={text =>
        store.dispatch({
          type: 'ADD_TODO',
          text: text,
          id: nextTodoId++
        })
      }
    />
    <TodoList
      todos={
        getVisibleTodos(
          todos,
          visibilityFilter
        )
      }
      onTodoClick={id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      } />
    <Footer/>
  </div>
);

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
