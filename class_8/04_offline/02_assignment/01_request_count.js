const express = require('express')
const app = express()

let count = 0;
app.use(function countRequest(req, res, next) {
    count++
    next()
})

app.get('/user1', function (req, res) {
    res.json({
        messege : "you visited the user1"
    })
})
app.get('/user2', function (req, res) {
    res.json({
        messege : "you visited the user2"
    })
})
app.get('/user3', function (req, res) {
    res.json({
        messege : "you visited the user3"
    })
})
app.get('/countRequest', function (req, res) {
    res.json({
        messege : `there is ${count} times your server got visited by the enduser`
    })
})

app.listen(3000, ()=>{
    console.log('your server is running on http://localhost:3000')
    console.log('user1: http://localhost:3000/user1')
    console.log('user2: http://localhost:3000/user2')
    console.log('user3: http://localhost:3000/user3')
    console.log('count visiings http://localhost:3000/countRequest')
})