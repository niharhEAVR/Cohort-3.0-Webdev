// cd class_8\02_offline\02_get_post_http
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
    let leftKidneyHealthStatus = users[0].kidneys[0].healthy ? "Healthy" : "Not Healthy"

    let healthyKidney = users[0].kidneys.filter((kidneys) => kidneys.healthy === true)

    res.json({
        leftKidneyHealthStatus,
        healthyKidney,
        users
    })

})
// query parameter is used to input (using the URL) some data in get method in http


// Now we will input data in body using post method
app.post('/', function (req, res) { // req and res parameters should not be swapped
    const peopleName = req.body.peopleName;
    users.push({
        name : peopleName
    })
    // now if you wondering how to post something on the users array of objects then read 01_notes.md
    res.send("Done")
})


app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})