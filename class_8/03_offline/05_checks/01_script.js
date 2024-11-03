// cd .\class_8\02_offline\05_checks\
const express = require('express')
const app = express()

app.use(express.json());

let users = [{
    name: "william",
    kidneys: [{
        id: "left-kidney",
        healthy: true
    }, {
        id: "Right-kidney",
        healthy: true
    }]
}]

app.get('/', function (req, res) {
    res.json({
        users
    })
})

app.post('/', function (req, res) {
    const peopleName = req.body.peopleName;
    const peopleKidneys = req.body.peopleKidneys;
    users.push({
        name: peopleName,
        kidneys: peopleKidneys
    })
    res.send("Done")
})

app.delete('/', function (req, res) {
    if(isThereAtleastOneUnhealthyKidney()){
        users[0].kidneys = users[0].kidneys.filter(kidneys => kidneys.healthy === true)
        res.send("Done")
    }else{
        res.status(411).json({
            bad_request: "You have no unhealthy kidney"
        })
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false
    if(!(users[0].kidneys[0].healthy && users[0].kidneys[1].healthy)){
        atleastOneUnhealthyKidney = true
    }
    return atleastOneUnhealthyKidney
}


app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})