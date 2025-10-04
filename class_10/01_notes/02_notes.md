# Route specific middlewares

**Route-specific middleware** in Express.js refers to middleware functions that are applied only to specific routes or route groups, rather than being used globally across the entire application

```jsx
// JSX stands for JavaScript XML
const express = require("express")
const app = express()

function logRequest(req, res, next) {
    console.log(`Request made to: ${req.url}`);
    next();
}

app.get('/special', logRequest, (req, res) => {
    res.send('This route uses route-specific middleware!');
});

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})
```

<aside>
💡

Only the `/special` endpoint runs the middleware

</aside>