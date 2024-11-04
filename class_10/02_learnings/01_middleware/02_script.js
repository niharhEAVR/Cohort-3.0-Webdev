const express = require("express")
const app = express()

app.use(express.json()) // if you want to learn what is the working of it then go 02_notes.md

app.post('/sum', (req, res) => {
    const a = req.body.a
    const b = req.body.b

    console.log(a,b)
    res.json({
        sum: a+b
    });
});

app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000")
})