### Running the CLI

With these changes, the commands should work without throwing a JSON parsing error. Here’s a quick refresher on how to use the CLI:

1. **Add a Todo**:
   ```bash
   node cli_todos.js add "Buy groceries"
   ```

2. **List Todos**:
   ```bash
   node cli_todos.js list
   ```

3. **Mark a Todo as Done**:
   ```bash
   node cli_todos.js done 0  # Assuming 0 is the index of the todo you want to mark
   ```

4. **Delete a Todo**:
   ```bash
   node cli_todos.js delete 0  # Assuming 0 is the index of the todo you want to delete
   ```