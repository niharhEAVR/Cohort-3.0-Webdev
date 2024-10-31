let index = 1;
document.querySelector('#submit').addEventListener('click',()=>{
    
    let todo = document.getElementById('input').value
    let h4 = document.createElement('h4')
    h4.innerHTML = `<div id="todo-${index}">${index}. ${todo}</div><br> <button onclick="removeTodo(${index})">remove</button>`
    document.getElementById('todos').append(h4)
    index++



    document.getElementById('input').value = "";
})

function removeTodo(index) {
    let todos = document.getElementById(`todo-${index}`)
    todos.parentNode.remove()
}