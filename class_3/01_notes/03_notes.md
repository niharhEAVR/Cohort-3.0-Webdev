Let’s break down what happens with a simple `setTimeout` in **JavaScript**.

Suppose you run this code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 2000);

console.log("End");
```

---

### 🔹 Step 1: **Call Stack** (Execution Contexts)

* The **Call Stack** is where JavaScript keeps track of what function is currently running.
* At the beginning:

  1. `console.log("Start")` is pushed → executed → popped.
  2. `setTimeout(...)` is pushed.

     * JS registers the timer in the **Web API** (not in the stack itself).
     * The callback function (`() => { console.log("Timeout callback") }`) is passed to the Web API.
     * Then `setTimeout` is popped off the stack.
  3. `console.log("End")` runs and is popped.

At this point, the **Call Stack is empty**.

---

### 🔹 Step 2: **Web API**

* The **Web API** is provided by the browser (not JavaScript itself).
* It handles things like:

  * `setTimeout`
  * DOM events (clicks, inputs)
  * HTTP requests (`fetch`, `XMLHttpRequest`)
* In our example:

  * When `setTimeout` is called, the **Web API** starts a timer (`2000ms`).
  * After 2 seconds, it moves the callback function into the **Callback Queue**.

---

### 🔹 Step 3: **Callback Queue** (a.k.a Task Queue)

* This is like a **waiting line** of functions that are ready to run but waiting for the stack to be empty.
* After 2s, the callback `() => console.log("Timeout callback")` is added to this queue.

---

### 🔹 Step 4: **Event Loop**

* The **Event Loop** is the traffic controller.
* Its job:

  1. Check if the Call Stack is empty.
  2. If empty → take the first function from the Callback Queue → push it onto the Call Stack.
* In our case:

  * Once the `console.log("End")` finished, the stack was empty.
  * After 2s, Event Loop takes the timeout callback → moves it to the Call Stack.
  * The callback runs: `"Timeout callback"` is printed.

---

### 🔹 Final Output:

```
Start
End
Timeout callback
```

---

👉 **Analogy:**

* **Call Stack** = Kitchen counter where one dish is being prepared at a time.
* **Web API** = Oven or timer where food cooks separately.
* **Callback Queue** = Waiting area for ready dishes.
* **Event Loop** = Waiter who checks if the counter is free, then brings the next ready dish.
