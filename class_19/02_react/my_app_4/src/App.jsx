import { useState } from 'react';
import React from 'react';
import './App.css';

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
    <div>
      <h1>Todo List</h1>
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
  throw new Error("Error while rendering");
  return (
    <div>
      <h1>Todo List</h1>
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

class ErrorBoundary extends React.Component { // read error boundry from 17_notes.md
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default App;
