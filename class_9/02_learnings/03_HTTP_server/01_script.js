const express = require("express")
const app = new express()



app.get("/sum", function(req, res) {
    let a = parseInt(req.query.a)
    let b = parseInt(req.query.b)
    let c = parseInt(req.query.c)
    res.json({
        answer: `The sum is ${a+b+c}`
    })
});

app.get("/subtract/:a/:b", function(req, res) {
    let a = parseInt(req.params.a) // look here that we use `params` instead of `query` , this is the slightly better way
    let b = parseInt(req.params.b)
    res.json({
        answer: `The subtract is ${a-b}`
    })
});

app.get("/multiply", function(req, res) {
    let a = parseInt(req.query.a)
    let b = parseInt(req.query.b)
    res.json({
        answer: `The multiply is ${a*b}`
    })    
    
});    

app.get("/divide", function(req, res) {
    let a = parseInt(req.query.a)
    let b = parseInt(req.query.b)
    res.json({
        answer: `The divide is ${a/b}`
    })    
    
    
});    

app.listen(3000, ()=>{
    console.log("Your server is running on http://localhost:3000/sum?a=3&b=2&c=5"); // this is how we can give input for 2 or more variables (/sum?a=3&b=2&c=5), this is for query
    console.log("Your server is running on http://localhost:3000/subtract/100/50"); // we can make easy inputs like this way
});