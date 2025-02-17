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
  .action((file, todo) => {

    let jsondata = JSON.stringify([{ todo }])
    fs.readFile(file, "utf-8", (err, content) => {
      if (!content) {
        fs.appendFile(file, jsondata, 'utf8', (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`${todo} added to your todo list`);
          }
        });
      } else {
        addTodo(content, jsondata,file)
      }
    })
  });

function addTodo(params, data,file) {
  params = JSON.parse(params);  
  
  data = JSON.parse(data); 

  params.push(...(data))
  
  params = JSON.stringify(params)

  fs.writeFile(file, params, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${data[0].todo} added to your todo list`);
    }
  });
}

program.parse();