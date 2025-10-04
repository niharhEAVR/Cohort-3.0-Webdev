In your code, `app.use(express.json())` is a middleware that enables your Express app to parse incoming request bodies formatted as JSON. Here’s how it works:

1. **Purpose**: When a client sends a POST request with JSON data in the request body, this middleware parses that JSON data and makes it available on `req.body`. Without `express.json()`, `req.body` would be `undefined` for JSON payloads.

2. **Use Case**: This is commonly used when building APIs that handle JSON data, as it’s a standard format for web APIs.

### Example Flow in Your Code
In your `POST /special` route:
- When a client sends a request with `Content-Type: application/json` and a JSON body (e.g., `{ "name": "Alice" }`), `express.json()` parses the JSON, and `req.body.name` becomes `"Alice"`.
- You then log `name` and send it back in the response.

If you removed `express.json()`, `req.body` would be undefined, and you wouldn’t be able to access the JSON data.

---

# Commonly used middlewares

Through your `journey of writing express servers` , you’ll find some commonly available (on npm) middlewares that you might want to use

### 1. express.json

The `express.json()` middleware is a built-in middleware function in Express.js used to parse incoming request bodies that are formatted as JSON. This middleware is essential for handling JSON payloads sent by clients in POST or PUT requests.

```jsx
const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Define a POST route to handle JSON data
app.post('/data', (req, res) => {
  // Access the parsed JSON data from req.body
  const data = req.body;
  console.log('Received data:', data);

  // Send a response
  res.send('Data received');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

<aside>
💡

Try converting the `calculator` assignment to use `POST` endpoints. Check if it works with/without the `express.json` middleware

</aside>

<aside>
💡

Express uses `bodyParser` under the hood - https://github.com/expressjs/express/blob/master/lib/express.js#L78C16-L78C26

</aside>