// cd class_8\02_offline\04_get_post_delete
const express = require('express')
const app = express()

app.use(express.json());

let users = [{
    name: "william",
    kidneys: [{
        id: "left-kidney",
        healthy: false
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
    users.filter(user => {
        user.kidneys = user.kidneys.filter(kidneys => kidneys.healthy === true)
    })
    res.send("Done")

    // step by step guide for running this code on 01_notes.md
})

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})