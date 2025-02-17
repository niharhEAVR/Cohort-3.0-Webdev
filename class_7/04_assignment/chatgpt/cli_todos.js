const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const filePath = 'todos.json';

// Helper function to load todos from JSON file
function loadTodos() {
  if (!fs.existsSync(filePath)) {
    // If the file doesn't exist, create it with an empty array
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  
  const data = fs.readFileSync(filePath, 'utf8');
  
  // Ensure we can parse the data safely
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Error parsing JSON data:', err);
    return []; // Return an empty array on error
  }
}

// Helper function to save todos to JSON file
function saveTodos(todos) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

// CLI Commands
program
  .name('Todo-List')
  .description('CLI-based todo-list app')
  .version('1.0.0');

// Add a todo
program
  .command('add')
  .description('Add a new todo')
  .argument('<todo>', 'The todo item to add')
  .action((todo) => {
    const todos = loadTodos();
    todos.push({ task: todo, done: false });
    saveTodos(todos);
    console.log(`Added todo: "${todo}"`);
  });

// Delete a todo by its index
program
  .command('delete')
  .description('Delete a todo by its index')
  .argument('<index>', 'Index of the todo to delete')
  .action((index) => {
    const todos = loadTodos();
    const idx = parseInt(index, 10);
    if (idx >= 0 && idx < todos.length) {
      const [deleted] = todos.splice(idx, 1);
      saveTodos(todos);
      console.log(`Deleted todo: "${deleted.task}"`);
    } else {
      console.log('Invalid index');
    }
  });

// Mark a todo as done by its index
program
  .command('done')
  .description('Mark a todo as done by its index')
  .argument('<index>', 'Index of the todo to mark as done')
  .action((index) => {
    const todos = loadTodos();
    const idx = parseInt(index, 10);
    if (idx >= 0 && idx < todos.length) {
      todos[idx].done = true;
      saveTodos(todos);
      console.log(`Marked todo as done: "${todos[idx].task}"`);
    } else {
      console.log('Invalid index');
    }
  });

// List all todos
program
  .command('list')
  .description('List all todos')
  .action(() => {
    const todos = loadTodos();
    console.log('Your todos:');
    todos.forEach((todo, index) => {
      const status = todo.done ? '[Done]' : '[Not Done]';
      console.log(`${index}: ${status} ${todo.task}`);
    });
  });

program.parse();
