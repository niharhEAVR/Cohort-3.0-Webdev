const express = require('express')
const app = express()

function middleware(req, res, next) {
    let age = req.query.age // http://localhost:3000/ride1?age=7
    if (age >= 14) {
        next();
    } else {
        res.json({
            bad_request: "Your age is less than the minimum criteria"
        })
    }
}

app.use(middleware)

app.get('/ride1', function (req, res) {
    res.json({
        hooray: "you ridel the ride 1"
    })
})

app.get('/ride2', function (req, res) {
    res.json({
        hooray: "you ridel the ride 2"
    })
})

app.listen(3000, ()=>{
    console.log("Your server is runing on http://localhost:3000/")
})