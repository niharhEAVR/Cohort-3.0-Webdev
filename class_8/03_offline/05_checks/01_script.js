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
},
{
    name: "cooldude",
    kidneys: [{
        id: "left-kidney",
        healthy: false
    }, {
        id: "Right-kidney",
        healthy: true
    }]
},
{
    name: "noname",
    kidneys: [{
        id: "left-kidney",
        healthy: false
    }, {
        id: "Right-kidney",
        healthy: false
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

app.delete('/:index', function (req, res) {
    let userNo = parseInt(req.params.index);

    if (isThereAtleastOneUnhealthyKidney(userNo)) {
        users[userNo].kidneys = users[userNo].kidneys.filter(kidney => kidney.healthy === true)
        res.send("Done")
    } else {
        res.status(411).json({
            bad_request: "You have no unhealthy kidney"
        })
    }
})

function isThereAtleastOneUnhealthyKidney(i) {
    let atleastOneUnhealthyKidney = false
    if (!(users[i].kidneys[0].healthy && users[i].kidneys[1].healthy)) {
        atleastOneUnhealthyKidney = true
    }
    return atleastOneUnhealthyKidney
}


app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})