When you run your Express server, the values are stored in the `users` array, which exists in memory (RAM). Since `users` is defined globally at the top of your script, it persists as long as the server is running. However, once the server restarts, the data in memory is lost because it is not being stored in a database or a file.

### Breakdown of what happens:
1. The `users` array is initialized when the server starts.
2. When you call `PUT /`, the `.map()` function updates the `healthy` property of all kidneys to `true`. This modifies the in-memory array.
3. The changes persist **only while the server is running**.
4. If you restart the server, the `users` array resets to its initial state because the data is not persisted.

### Where is the data stored?
- **In-memory (RAM)**: The array is part of the process's memory, and it only exists while the Node.js server is running.

### How to persist the data?
If you want the data to remain even after a restart, you need to store it in:
1. **A database (MongoDB, PostgreSQL, MySQL, etc.)**
2. **A file (JSON, CSV, or text files)**
