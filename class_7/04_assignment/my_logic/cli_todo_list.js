const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('Todo-List')
  .description('CLI based todo-list app ')
  .version('0.8.0');

program.command('addTodo')
  .description('Add the todo in the todos.json')
  .argument('<file>', 'File to store Todos')
  .argument('<todo>', 'Add todo')
  .action((file,todo) => {

    let jsondata = JSON.stringify({todo})
    fs.appendFile(file, jsondata, 'utf8', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${todo} added to your todo list`);
      }
    });
  });

program.parse();