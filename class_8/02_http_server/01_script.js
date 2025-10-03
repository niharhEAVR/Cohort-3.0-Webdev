// to change directory => cd .\class_8\02_http_server

const express = require('express')
const app = express()

// route handlers
app.get('/', function (req, res) {
  // the (res.send) or (res) is working for responding data
  // in html format
  res.send('Hello Nihar')
  //   res.send('Hello Nihar') // we cannot access .send two times
})

app.get('/about', function (req, res) {
  res.send('Hello Nihar from the about route')
  // on the localhost:3001/ type => localhost:<port>/about
})

app.get('/about/me', function (req, res) {
  res.send('<b><i>Hello Nihar from about/me route</i></b>')
  // on the localhost:3001/ type => localhost:<port>/about/me
})

app.get('/json', function (req, res) {
  res.json({
    "id": 69,
    "name": "nihar"
  })
  // if you type this (localhost:3001/json) thing on any browser then you will get to see a api type page
})

app.listen(3001) // port number