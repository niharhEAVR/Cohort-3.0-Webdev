### Facts/Callouts
   - **React, NextJS** are frameworks . They compile down to HTML, CSS, JS in the end. That is what your browser understands.
   - When you run your C++ code on leetcode , it does not run on your browser/machine. It runs somewhere else. Your browser can’t (almost) compile and run C++ code.
   - If someone asks — What all languages can your browser interpret, the answer is HTML, CSS, JS and WebAssembly. It can, technically, run C++/Rust code that is compiled down to Wasm

---

Let's break down the two downsides you mentioned:

### 1. **Performance Overhead**:
   - **Meaning**: This refers to the extra processing time or resources that JavaScript might need compared to other programming languages.
   - **Why it happens**: JavaScript is an interpreted language, meaning it's not compiled into machine code before execution. Instead, it's executed line by line in the browser or runtime environment (like Node.js), which adds some delay in performance. In addition, JavaScript often relies on abstractions (like higher-level APIs, dynamic typing, and garbage collection), which can slow down execution, especially in performance-critical applications like large-scale games or scientific simulations.
   - **Result**: Tasks that require high performance, like complex computations or rendering graphics, might take longer or use more resources in JavaScript compared to faster, compiled languages like C++ or Rust.

### 2. **More prone to runtime errors**:
   - **Meaning**: JavaScript is more likely to encounter errors during execution (runtime), instead of catching them before the code is run (like during compilation).
   - **Why it happens**: JavaScript is loosely typed, meaning you can change the type of a variable dynamically (e.g., from a number to a string), which can lead to unexpected behavior or bugs. Since JavaScript doesn't check for errors before running the code (it’s not a statically typed language), some bugs are only discovered when the program is already running.
   - **Result**: You might encounter issues like undefined variables or unexpected type conversions while the application is running, which can break functionality.

Both of these aspects are important when choosing the right tool for a particular application, as they can affect performance and stability.

---

The image you provided explains the concept of **dynamic typing** in JavaScript compared to **static typing** in C++. Here's a summary:

### **Dynamically Typed** (JavaScript):
- In JavaScript, variables are **not bound to a specific data type**. You can assign a value of one type (like a number) and later change it to a different type (like a string or boolean).
- The JavaScript code in the image shows that you can assign different types of values (`1`, `"harkirat"`, and `true`) to the same variable `a`, and it will run without errors.
- This flexibility makes JavaScript easier to write, but also increases the chance of **runtime errors** (as mentioned earlier), because the type checking only happens at runtime.

### **Statically Typed** (C++):
- In C++, variables are **statically typed**, meaning that once you declare a variable with a certain type (e.g., `int` for integers), you cannot change its type later in the program.
- In the C++ code in the image, trying to assign a string (`"hello"`) or a boolean (`true`) to an integer variable `a` would result in a **compilation error**.
- This makes C++ safer in terms of type errors but more rigid because you have to be specific about types upfront.

The key difference here is that **JavaScript allows variables to change types dynamically**, while **C++ enforces strict type rules** at compile time, preventing you from making type-related mistakes before running the program.

---

This image explains JavaScript's **single-threaded** execution model and contrasts it with languages that can utilize **multi-threading**, such as Rust and C++.

### Explanation
1. **Single-Threaded Execution (JavaScript)**:
   - JavaScript operates in a single-threaded environment, meaning it processes one task at a time. 
   - In the image, only one CPU core (CPU1) is highlighted as "in use," representing JavaScript's limitation to using a single core at a time for synchronous tasks.
   - This single-threaded nature can become a bottleneck in performance when handling multiple tasks simultaneously.

2. **Multi-Threaded Execution (Rust/C++)**:
   - Languages like Rust and C++ support multi-threading, allowing them to use multiple CPU cores simultaneously.
   - In the image, multiple CPU cores are highlighted, showing how these languages can execute tasks in parallel across several cores.
   - Multi-threading enables higher performance, especially for applications that require concurrent processing, such as computational tasks or handling multiple requests.

### Summary
JavaScript's single-threaded model simplifies development but limits performance in CPU-intensive or highly concurrent applications. In contrast, Rust and C++ offer more control and efficiency through multi-threading, making them suitable for high-performance applications.

---

The image compares three memory management approaches in programming: **Garbage Collection**, **Manual Memory Management**, and **Rust's Ownership Model**. Here's a breakdown:

### 1. Garbage Collection
- **Explanation**: Languages like JavaScript (JS) and Java use garbage collection to manage memory automatically. This means the programmer doesn’t have to explicitly free up memory, reducing the chances of memory leaks or dangling pointers.
- **Pros**: Simplifies coding as memory is managed automatically.
- **Cons**: Programmers can't manually control memory allocation and deallocation, which can lead to performance overhead.
- **Examples**: Java, JavaScript.

### 2. Manual Memory Management
- **Explanation**: In languages like C, programmers are responsible for both allocating and deallocating memory. This approach gives more control over memory but increases complexity.
- **Pros**: Allows fine-grained control, which can improve performance in skilled hands.
- **Cons**: High risk of errors like memory leaks and dangling pointers, leading to potential crashes.
- **Examples**: C.

### 3. Rust's Ownership Model
- **Explanation**: Rust introduces an ownership model to handle memory. This model ensures that memory management is both safe and efficient by enforcing strict rules about how memory is accessed and released.
- **Pros**: Provides safety against memory errors without the performance cost of garbage collection.
- **Cons**: Learning Rust’s ownership rules can have a steep learning curve.
- **Examples**: Rust.

### Conclusion
The text concludes with an evaluation of JavaScript (JS) as a language. JavaScript is praised for being beginner-friendly, but it has performance limitations due to garbage collection. A tool called **Bun** is mentioned as attempting to address some of JS’s performance issues, but it will take time for JS to reach the performance level of languages like C++ or Rust, which offer better control over memory management.

---

My apologies for the misunderstanding! In JavaScript, **Bun** is a modern JavaScript runtime like Node.js. It was created to be a fast and efficient alternative for running JavaScript applications, especially in the context of server-side programming. Here are some key features of Bun:

### Key Features of Bun:
1. **Performance**: Bun aims to be significantly faster than existing JavaScript runtimes, focusing on performance optimizations.
2. **Built-in Tooling**: It comes with built-in support for bundling, transpiling, and package management, which can simplify the development workflow.
3. **Native Support for ES Modules**: Bun has strong support for ES modules, making it easier to work with modern JavaScript syntax.
4. **Bun's API**: It provides APIs for file system operations, HTTP servers, and more, making it convenient for developers to build applications.

### Use Cases:
- Bun is suitable for building web servers, APIs, and full-stack applications.
- It can also be used for scripting and automation tasks.

If you have any specific questions about Bun or need more details, feel free to ask!