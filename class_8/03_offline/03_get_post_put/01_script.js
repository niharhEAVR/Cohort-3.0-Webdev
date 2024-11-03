// cd class_8\02_offline\03_get_post_put
const express = require('express')
const app = express()

app.use(express.json());

const users = [{
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

app.put('/', function (req, res) {
    users.map(userKidneys => userKidneys.kidneys.map(kidneys => kidneys.healthy = true))
    res.send("Done")

    // if you want to run the code then read 01_notes.md and follow step by step 

    // so for put method => just go to the postman and then selects method put and click on send
    // no need to write or change anything on the body
    // because for the pu method we have written all the code here and you have to just access it
})

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})