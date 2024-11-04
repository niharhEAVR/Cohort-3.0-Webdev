Error handling in **Axios** is straightforward since it automatically throws an error for HTTP responses with status codes outside the range of 2xx (like 404 or 500). This makes it easier to catch and handle errors in a `try-catch` block or by chaining a `.catch()` method.

Here's how you can handle errors with Axios:

### 1. **Using `try-catch` for Error Handling**

With `async`/`await`, you can wrap your Axios request in a `try-catch` block to handle errors:

```javascript
(async () => {
    try {
        let response = await axios.get("https://jsonplaceholder.typicode.com/users/999"); // Invalid user ID for demonstration
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            // The request was made, and the server responded with a status code outside of 2xx
            console.log("Error Status:", error.response.status); // e.g., 404
            console.log("Error Data:", error.response.data); // Server error message
        } else if (error.request) {
            // The request was made, but no response was received
            console.log("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error:", error.message);
        }
    }
})();
```

### Explanation of `error` Object in Axios
The `error` object in Axios has specific properties that help you understand what went wrong:
- **`error.response`**: Contains details if the server responded with a status outside the 2xx range (e.g., 404 for not found, 500 for server error). Useful properties include:
  - `error.response.status`: The HTTP status code.
  - `error.response.data`: The response body, usually containing error information from the server.
- **`error.request`**: Contains information if the request was sent but no response was received (e.g., network issues).
- **`error.message`**: Contains a general error message if there’s an issue with setting up the request.

### Example Scenarios
1. **Handling a 404 Not Found Error**:
   ```javascript
   try {
       let response = await axios.get("https://jsonplaceholder.typicode.com/users/999");
   } catch (error) {
       if (error.response && error.response.status === 404) {
           console.log("User not found (404 error)");
       }
   }
   ```

2. **Network Error Handling**:
   ```javascript
   try {
       let response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
   } catch (error) {
       if (error.request) {
           console.log("Network error or server didn't respond");
       }
   }
   ```

### 2. **Using `.catch()` Method**

You can also handle errors with `.catch()` when you don’t use `async/await`.

```javascript
axios.get("https://jsonplaceholder.typicode.com/users/999")
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        if (error.response) {
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data);
        } else if (error.request) {
            console.log("No response received:", error.request);
        } else {
            console.log("Error:", error.message);
        }
    });
```

### Summary
Axios simplifies error handling by providing detailed error information:
- **`error.response`** for HTTP errors from the server.
- **`error.request`** if no response was received.
- **`error.message`** for other request setup issues.