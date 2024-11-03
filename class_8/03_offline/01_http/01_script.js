// cd class_8\02_offline\01_http
const express = require('express')
const app = express()

function calculateSum(num) {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        sum += i        
    }
    return sum
}


app.get('/', function (req, res) {
    const num = parseInt(req.query.num)
    const answer = calculateSum(num)
    res.send(`<b>The answer is ${answer.toString()}</b>`)
})

app.listen(3000, ()=>{
    console.log('The server is runing on http://localhost:3000');
})