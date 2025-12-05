import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 }); // this means that the websocket is running on port: 8080
// and the link is : `ws://localhost:8080`

// new connection connect's here
wss.on('connection', function connection(socket) {
  console.log("user connected");

  // server sends messege to client
  socket.send("hello")

  setInterval(()=>{
    let price = Math.random();
    console.log(`The price of bitcoin is: ${price}`)
    socket.send(`The price of bitcoin is: ${price}`)
  },1500)
  
  // client sends messege to server (means client subscribe to the websocket server)
  socket.on("message",(e)=>{
    console.log(e.toString())
  })

  // client sends messege to server (means client unsubscribe to the websocket server)
  socket.off("message",(e)=>{
    console.log(e.toString())
  })

});
