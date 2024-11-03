# Using middleware
- Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

**Middleware** functions are functions that have access to the `request object (req)`, the `response object (res)`, and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

### Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

---

### Here is the actuall breakdown of the above text

**Understanding Middleware in Express**

Express is a web framework that helps you manage how a server handles requests and responses, but it doesn’t come with many built-in features. Instead, it allows you to add functionality by using something called **middleware**.

**What is Middleware?**

In Express, an application is made up of a series of **middleware functions** that handle the flow of data through the app. Think of it as a series of steps that each request goes through before it gets a response.

Each **middleware function** has access to:
- The **request** (`req`) object, which contains details about the request (like any data the user sends).
- The **response** (`res`) object, which allows you to send back data to the user.
- A special function called **next**, which tells Express to move on to the next step.

**What Can Middleware Do?**

Middleware functions can do several things:
1. **Run any code**: They can perform operations, like logging requests or calculating something.
2. **Modify requests and responses**: Middleware can change the request and response data if needed (e.g., parse JSON data, add headers).
3. **End the request-response cycle**: Some middleware sends a response directly and finishes the process.
4. **Move to the next middleware**: By calling `next()`, the function passes control to the next middleware function in the sequence.

**Example of How Middleware Works**

When you set up an Express app, you might add multiple middleware functions like this:

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('First middleware');
  next(); // Passes control to the next middleware
});

app.use((req, res, next) => {
  console.log('Second middleware');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

In this example:
- Each `app.use()` defines a middleware function.
- The `next()` function tells Express to continue to the next middleware in line.
- Eventually, the last middleware sends a response to the user (`Hello, world!`), which ends the process.

So, middleware is a way to layer functionality, step-by-step, to handle requests and build Express apps.

---


### . Output Explanation

When you start the server with `node app.js`, you’ll see this message in the terminal:
```
Server running on port 3000
```

1. Open a web browser and go to `http://localhost:3000`.
2. When you visit the root URL `/`, the following actions occur in sequence:

   - The first middleware runs, and you'll see:
     ```
     First middleware
     ```
   - The second middleware runs, logging:
     ```
     Second middleware
     ```
   - Finally, the route handler responds to the browser with:
     ```
     Hello, world!
     ```

So, the output in your **terminal** will be:
```
Server running on port 3000
First middleware
Second middleware
```

And in your **browser**, you'll see:
```
Hello, world!
```

This sequence demonstrates how the middleware functions are executed in order before the final response is sent to the client.