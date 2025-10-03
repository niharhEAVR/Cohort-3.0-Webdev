// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second


const express = require('express')
const app = express()

let numberOfRequestsForUser = [
  {
    user: 1,
    count: 1
  }
]

function check(userId) {
  let check = false
  numberOfRequestsForUser.forEach(a => {
    if (a.user == userId) {
      check = true;
    }
  })
  return check;
}

let count = 0;
function rateLimitter(req, res, next) {
  let userId = parseInt(req.query.userId);
  req.id = userId;

  if (!check(userId)) {
    count = 0;
    ++count;
    numberOfRequestsForUser.push({
      user: userId,
      count: count
    })
  } else {
    count = numberOfRequestsForUser[userId - 1].count
    ++count;
    numberOfRequestsForUser[userId - 1].count = count
  }

  next();
}


let intervalId; // setInterval doesn’t replace the old one — it creates a brand-new timer each time. SO Store the interval ID in a variable.
function resetRateLimitter() {
  if (!intervalId) {   // only start once
    intervalId = setInterval(() => {
      Object.values(numberOfRequestsForUser).forEach(user => {
        user.count = 0;
      });
    }, 5000);
  }
}

app.use(rateLimitter)

app.get('/api/cluster', function (req, res) {

  if (numberOfRequestsForUser[req.id - 1].count <= 5) {
    res.status(200).json(numberOfRequestsForUser)
  } else {
    res.status(400).send("Too many request")
  }

  resetRateLimitter();

})



app.listen(3000, () => {
  console.log(`The server is running on http://localhost:3000/api/cluster?userId=1`);

})
