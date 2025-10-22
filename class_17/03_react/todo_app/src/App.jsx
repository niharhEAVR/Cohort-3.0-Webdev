import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { title: "Go to gym", description: "Hit the gym regularly", progress: true },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(false);

  function addTodo() {
    if (!title.trim() || !description.trim()) return; // Prevent empty todos
    setTodos([...todos, { title, description, progress }]);
    setTitle("");
    setDescription("");
    setProgress(false);
  }

  function deleteTodo(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={progress}
            onChange={(e) => setProgress(e.target.checked)}
          />
          Progressing
        </label>
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {todos.map((todo, index) => (
        <Todo
          key={index}
          title={todo.title}
          description={todo.description}
          progress={todo.progress}
          del={() => deleteTodo(index)}
        />
      ))}
    </div>
  );
}

function Todo({ title, description, progress, del }) {
  return (
    <ul className="box">
      <li>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{progress ? "Task is progressing ✅" : "Task is not progressing ❌"}</p>
        <button className="del" onClick={del}>
          Delete
        </button>
      </li>
    </ul>
  );
}

export default App;
