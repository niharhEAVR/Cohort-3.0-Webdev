let todos = [];

function addTodo() {
    const title = document.querySelector("#input").value;
    if (title) {
        todos.push({ title });
        console.log(todos);
        render();
        document.querySelector("#input").value = '';
    }
}

function removeTodo(index) {
   todos.splice(index, 1);
   console.log(todos);
   render();
}

function render() {
    const todoContainer = document.getElementById('todos');
    todoContainer.innerHTML = ''; // Clear the current list

    todos.forEach((todo, index) => {
        let element = document.createElement('h3');

        let todoDiv = document.createElement('div');
        todoDiv.innerHTML = `${index + 1}. ${todo.title}`;

        let removeButton = document.createElement('button');
        removeButton.setAttribute('onclick', `removeTodo(${index})`);
        removeButton.setAttribute('id', `todo-${index}`);
        removeButton.innerHTML = 'Remove';

        element.appendChild(todoDiv);
        element.appendChild(removeButton);

        todoContainer.appendChild(element);
    });
}
