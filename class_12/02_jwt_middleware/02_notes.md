The assignment `req.username = decodedJWT.username` in the `loginCheck` middleware function makes `req.username` available to the `/dashboard` route handler due to the way middleware functions work in Express. Here’s how it happens step-by-step:

### 1. **Middleware Flow in Express**
   - When a request is made to the `/dashboard` route, Express executes any middleware functions specified before the route handler.
   - Here, `loginCheck` is specified as middleware for the `/dashboard` route: `app.get("/dashboard", loginCheck, (req, res) => { ... })`.
   - This means that before reaching the `/dashboard` route handler, the `loginCheck` middleware will run.

### 2. **Setting `req.username` in Middleware**
   - In the `loginCheck` function, after verifying the token and confirming the user exists, `req.username` is assigned with `decodedJWT.username`.
   - `req` is the request object that is shared and passed along the entire request-response cycle within this request.
   - When `req.username = decodedJWT.username` is set, this value remains part of `req` as it moves to the next function.

### 3. **Calling `next()` to Continue the Request**
   - If the user is authorized, `loginCheck` calls `next()`, which passes control to the next middleware or route handler.
   - Since `req` is the same object throughout the cycle, `req.username` is now available in the `/dashboard` handler.

### 4. **Accessing `req.username` in `/dashboard`**
   - By the time control reaches the `/dashboard` route handler, `req.username` holds the decoded username set in the middleware.
   - Inside `/dashboard`, `req.username` can be used to find the user’s information in the `users` array and respond with the relevant data.

### In Summary
- The `loginCheck` middleware sets `req.username` and then calls `next()`.
- `next()` passes the modified `req` object to the `/dashboard` handler.
- The `/dashboard` handler can then access `req.username` to complete its response, making `req.username` available to all functions called after the middleware in that request cycle.


---

# If you still not understand then read this:

Yes, exactly! Here’s how it works in detail:

1. **Shared `req` and `res` Objects Across Middleware**:
   - In Express, the `req` (request) and `res` (response) objects are created at the start of each request and are passed along to each middleware and route handler involved in that request.
   - Since both `req` and `res` are passed by reference, any changes made to `req` (or `res`) in one middleware function are preserved and accessible in all subsequent middleware functions and the route handler.

2. **Modifying `req` in Middleware**:
   - In `loginCheck`, when we assign `req.username = decodedJWT.username`, we’re adding a new property (`username`) to the `req` object.
   - This `username` property stays on the `req` object throughout the request cycle. When `next()` is called, the same modified `req` object is passed to the next function, which in this case is the route handler for `/dashboard`.

3. **Accessing Modified `req` in the Route Handler**:
   - When control reaches the route handler `(req, res) => { ... }` for `/dashboard`, it receives the same `req` object that was modified in `loginCheck`.
   - Now, `req.username` is accessible in the route handler, allowing it to retrieve the user data associated with that username.

### Example Walkthrough

Here's how the request flows:

- **Step 1**: Request comes in to `/dashboard`.
- **Step 2**: `loginCheck` middleware runs.
   - It verifies the JWT.
   - It adds `req.username = decodedJWT.username`.
   - Calls `next()`, passing control (and the modified `req` object) to the next function.
- **Step 3**: `/dashboard` route handler runs.
   - Receives the same `req` object.
   - `req.username` now contains the value from `loginCheck`, which can be used to fetch user details.

### Why This Works
Since `req` is an object, it’s mutable and passed by reference. Any middleware or route handler can modify it, and those modifications persist throughout the request cycle. This pattern is common in Express for sharing data or user state across middleware and route handlers.