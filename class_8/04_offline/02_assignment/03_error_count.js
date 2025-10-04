// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint




const express = require('express')
const app = express()
let errorCount = 0;

app.get('/home', function (req, res, next) {


  let flag = Math.random() >= 0.5 ? true : false;

  if (flag) {
    res.send('Hello World')
  }
  else {
    next(new Error("Something went wrong"))
  }
})

app.use((err, req, res, next) => {
  errorCount++;
  console.log(errorCount);
  // console.log(err);
  res.status(404).send("Not Found");
})


app.listen(3000)
