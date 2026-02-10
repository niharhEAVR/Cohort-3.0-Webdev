import express from "express";


const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/:id", (req, res) => {

    if(req.params.id === "ping"){
        res.send(`pong ${new Date().toISOString()}`);
    }

});

app.listen(4000, () => {
    console.log("Server is running on port 3000");
});