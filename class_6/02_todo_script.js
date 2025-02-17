// In my code there is so many bugsso feel free to read 02_notes.md
let todos = [];
let index = 0
function addTodo() {
    todos.push({
        title: document.querySelector("#input").value
    })
    console.log(todos)
    render(index);
    index++
    document.querySelector("#input").value = ''
}



function removeTodo(index) {
   todos.splice((index),1)
   let removeTodo = document.getElementById(`todo-${index}`).parentNode
   removeTodo.parentNode.removeChild(removeTodo)
   console.log(todos)
    render();
}

function render(index) {
    

    let element = document.createElement('h3')

    let todo = document.createElement('div')
    todo.innerHTML = `${todos.indexOf(todos[index]) + 1}. ${todos[index].title}`

    let removeText = document.createElement('button')
    removeText.setAttribute('onclick', `removeTodo(${index})`)
    removeText.setAttribute('id', `todo-${index}`)
    removeText.innerHTML = `remove`
    element.appendChild(todo)
    element.appendChild(removeText)


    document.getElementById('todos').append(element)
}