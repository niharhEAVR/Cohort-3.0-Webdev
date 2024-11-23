import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 }); // this means that the websocket is running on port: 8080
// and the link is : `ws://localhost:8080`

// new connection connect's here
wss.on('connection', function connection(socket) {
  console.log("user connected");

  // server sends messege to client
  socket.send("hello")

  setInterval(()=>{
    console.log(`The price of bitcoin is: ${Math.random()}`)
  },500)
  
  // client sends messege to server (means client subscribe to the websocket server)
  socket.on("message",(e)=>{
    console.log(e.toString())
  })

  // client sends messege to server (means client unsubscribe to the websocket server)
  socket.off("message",(e)=>{
    console.log(e.toString())
  })

});

// read 04_code_explanation.md to understand this