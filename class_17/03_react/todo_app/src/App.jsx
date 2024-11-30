import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      description: "Hit the gym regularly",
      done: true,
    },
  ]);

  function addTodo() {
    let newArray = [...todos];

    newArray.push({
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      done: document.getElementById("doneYet").checked, // Use .checked for checkbox
    });
    setTodos(newArray);
  }

  /*
    setTodos([
      ...todos,
      {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        done: document.getElementById("doneYet").checked, // Use .checked for checkbox
      }
    ])
  */


  return (
    <div>
      <input id="title" type="text" placeholder="Title" />
      <input id="description" type="text" placeholder="Description" />
      <input id="doneYet" type="checkbox" />
      <br />
      <button onClick={addTodo}>Add todo</button>
      <br />
      {todos.map((todo, index) => (
        <Todo
          key={index} // Add a unique key to each Todo component
          title={todo.title}
          description={todo.description}
          done={todo.done}
        />
      ))}
    </div>
  );
}

function Todo(props) {
  return (
    <ul>
      <li>
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.done ? "Task is done" : "Task is not done"}</p>
      </li>
    </ul>
  );
}

export default App;
