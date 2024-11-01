let count = 1;
document.querySelector('#addTodo').addEventListener('click', () => {
    let todo = document.getElementById('input').value
    if (todo === '') {
        alert('write any todo!')
    } else {
        let element = document.createElement('h3')

        let text = document.createElement('span')
        text.innerHTML = `${count}. ${todo} &nbsp;&nbsp;`
        let removeText = document.createElement('button')
        removeText.setAttribute('onclick', `removeTodo(${count})`)
        removeText.setAttribute('id', `todo-${count}`)
        removeText.innerHTML = `remove`
        element.appendChild(text)
        element.appendChild(removeText)
        document.getElementById('todos').append(element)
        count++
        document.getElementById('input').value = ''
    }
})

function removeTodo(count) {
    let todo = document.getElementById(`todo-${count}`).parentNode
    todo.parentNode.removeChild(todo)
}   