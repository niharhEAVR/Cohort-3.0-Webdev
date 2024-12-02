import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(socket) {
  console.log("user connected");

  socket.on("message", (e) => {
    if (e.toString() === "ping") {
      socket.send("pong")
    }
  })

});


// if you are interecting with the frontend of this class then you need to run this backend code to simultaneously working with frontend