const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors()) // use it like this

app.post("/sum", function(req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b
    })
});

app.listen(3000)

// so cors is a library or framework
// we need to install it manually