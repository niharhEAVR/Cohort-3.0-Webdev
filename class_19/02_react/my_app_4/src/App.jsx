import { useState } from 'react';
import React from 'react';
import './App.css';


// to understand how react rerenders a array on the ui then read 12_react_array_rerendering.md
function App() {
  return (
    <>
      <Todo1 />
      
      <ErrorBoundary>
        <Todo2 />
      </ErrorBoundary>
    </>
  );
}

function Todo1() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Do exercise', completed: false },
    { id: 2, text: 'Try to finish React today', completed: true }
  ]);
  return (
    <div className='box1'>
      <h1>Todo List - 1</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Todo2() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy fresh fishes in the morning', completed: true },
    { id: 2, text: 'Buy fresh vegetables', completed: true },
  ]);
  return (
    <div className='box2'>
      <h1>Todo List - 2</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
