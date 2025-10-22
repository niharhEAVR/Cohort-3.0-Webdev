```jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      description: "Hit the gym regularly",
      progress: true,
    },
  ]);

  function addTodo() {
    let newArray = [...todos];

    newArray.push({
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      progress: document.getElementById("doneYet").checked, // Use .checked for checkbox
    });
    setTodos(newArray);
  }


  function deletef(i) {
    todos.splice(i - 1, i);
  }


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
          progress={todo.progress}
          del={deletef(index)}
        />
      ))}
    </div>
  );
}

function Todo(props) {



  return (
    <ul className="box">
      <li>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>{props.progress ? "Task is progressing" : "Task is not progressing"}</p>
        <button className="del" onClick={props.del}>Delete</button>
      </li>
    </ul>
  );
}

export default App;

```


I went through your React code carefully. There are **a few problems**, mostly related to **state mutation, event handling, and how you are passing functions as props**. Let’s go step by step.

---

### **1️⃣ Problem: `deletef` function**

You wrote:

```js
function deletef(i) {
  todos.splice(i - 1, i);
}
```

**What's wrong:**

1. **Directly mutating state**: `todos.splice(...)` modifies the array in place. In React, **you must never mutate state directly** because React won’t know the state changed and won’t re-render.

2. **Wrong indices for `splice`**: `splice(i - 1, i)` is incorrect:

   * `i - 1` could be `-1` for the first item → will break.
   * `i` as delete count is wrong; it should just delete 1 item.

3. **Not updating state**: You did `splice` but never called `setTodos`, so the UI won’t update.

---

### **2️⃣ Problem: Passing `deletef` as prop**

You wrote:

```js
{todos.map((todo, index) => (
  <Todo
    key={index}
    title={todo.title}
    description={todo.description}
    progress={todo.progress}
    del={deletef(index)}
  />
))}
```

**What's wrong:**

* `deletef(index)` **calls the function immediately** while rendering instead of passing it as a function.
* `del` should be a **function reference**, not the result of a function call.

---

### **3️⃣ Problem: Using `document.getElementById`**

```js
title: document.getElementById("title").value,
```

**Why it’s not ideal:**

* React is designed to use **controlled components** with `useState` rather than querying the DOM.
* Using `document.getElementById` works but is not “React way,” and can lead to bugs if your app grows.

---

### ✅ **How to Fix Everything**

#### **Step 1: Make `deletef` correct**

```js
function deletef(index) {
  const newTodos = todos.filter((_, i) => i !== index);
  setTodos(newTodos);
}
```

* `filter` returns a **new array** without mutating the original.
* `setTodos` updates state → React re-renders.

---

#### **Step 2: Pass `deletef` properly**

```js
<Todo
  key={index}
  title={todo.title}
  description={todo.description}
  progress={todo.progress}
  del={() => deletef(index)} // Pass a function reference
/>
```

---

#### **Step 3: Optional: Use controlled inputs**

Instead of `document.getElementById`, you can do:

```js
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [progress, setProgress] = useState(false);

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
<input
  type="checkbox"
  checked={progress}
  onChange={(e) => setProgress(e.target.checked)}
/>
```

Then your `addTodo` becomes:

```js
function addTodo() {
  setTodos([...todos, { title, description, progress }]);
  setTitle("");
  setDescription("");
  setProgress(false);
}
```

---

#### **Step 4: Fixed complete rendering**

```js
{todos.map((todo, index) => (
  <Todo
    key={index}
    title={todo.title}
    description={todo.description}
    progress={todo.progress}
    del={() => deletef(index)}
  />
))}
```

---

### **Summary of Problems**

| Problem                          | Cause                            | Solution                                              |
| -------------------------------- | -------------------------------- | ----------------------------------------------------- |
| `splice` used on state           | Mutates original array           | Use `filter` or spread operator to create a new array |
| `deletef(index)` called directly | Function is executed immediately | Pass as a function: `() => deletef(index)`            |
| Using `document.getElementById`  | Not idiomatic React              | Use controlled inputs with `useState`                 |
| UI not updating                  | State not updated after mutation | Always call `setTodos` with a **new array**           |



---
---
---






```js
const newTodos = todos.filter((_, i) => i !== index);
```

---

### **1️⃣ `todos.filter(...)`**

* `filter` is an **array method** in JavaScript.
* It **creates a new array** containing only the elements for which the callback returns `true`.
* Important: It **does not mutate** the original array.

---

### **2️⃣ The callback `( _, i ) => i !== index`**

* `_` is the current element (we don’t need it here, so it’s just `_` as a placeholder).
* `i` is the index of that element in the array.
* `index` is the index of the todo you want to delete (passed to the function).

**Logic:**

```js
i !== index
```

* Keeps all todos **except** the one whose index equals `index`.
* So, the todo at that `index` is **removed** from the new array.

---

### **3️⃣ Why this works for deleting**

* Original `todos` array is **not mutated**.
* `filter` returns a **new array without the deleted todo**.
* Then `setTodos(newTodos)` updates the state and re-renders the UI.

---

💡 **Example**

```js
const todos = ["Gym", "Study", "Cook"];
const index = 1; // delete "Study"

const newTodos = todos.filter((_, i) => i !== index);
console.log(newTodos); // ["Gym", "Cook"]
```

So `"Study"` is removed, but the original `todos` is not changed directly.
