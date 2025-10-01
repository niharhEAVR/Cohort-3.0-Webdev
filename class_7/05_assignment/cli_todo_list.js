const fs = require('fs');
const { Command } = require('commander');
const program = new Command();


try {
  let content = fs.readFileSync("todos.json", "utf-8");
  if (!content) {
    fs.writeFileSync("todos.json", "[]", "utf-8");
    console.log("done");
  }
} catch (err) {
  console.log(err);
}


program
  .name('Todo-List')
  .description('CLI based todo-list app ')
  .version('0.8.0');

program.command('add')
  .description('Add the todo in the todos.json')
  .argument('<todo>', 'buy groceries')
  .action((todo) => {
    let content = JSON.parse(fs.readFileSync("todos.json", "utf-8"));

    addTodo(content, todo) // [array of todos] , "todo"
  });


program.command('markDone')
  .description('mark as done the specific todos')
  .argument('<index no>', 'start from 0')
  .action((index) => {
    let content = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    index = Number(index)

    markDone(content, index) // [array of todos] , index
  });

program.command('delete')
  .description('delete the specific todos')
  .argument('<index no>', 'start from 0')
  .action((index) => {
    let content = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    index = Number(index)

    deleteTodo(content, index) // [array of todos] , index
  });


function addTodo(content, todo) {
  let todos = {
    task: todo,
    done: false
  }
  content.push(todos)
  content = JSON.stringify(content)
  fs.writeFile("todos.json", content, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${todo} added to your todo list`);
    }
  });
}

function markDone(content, index) {
  for (let i = 0; i < content.length; i++) {
    if (i === index) {
      content[i].done = true;
    }
  }
  content = JSON.stringify(content)

  fs.writeFile("todos.json", content, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`marked done`);
    }
  });
}

function deleteTodo(content, index) {
  content.splice(index, 1)

  content = JSON.stringify(content)

  fs.writeFile("todos.json", content, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`deleted`);
    }
  });
}



program.parse();