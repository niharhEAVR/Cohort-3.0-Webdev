import { WebSocketServer, type WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 })

let allSockets: WebSocket[] = [];
// this array is created because i want to put all the socket connections in this array (socket actually means connections)

ws.on("connection", function connection(socket) {

    allSockets.push(socket);
    allSockets.forEach((s,index)=>{
        console.log(`user ${index+1} connected`);  
    })
    console.log("\n");
    

    socket.on("message", (data) => {
        allSockets.forEach((s,d) => {
            
            if (s !== socket ) {
                s.send(data.toString());
            }
        })
        // we are running a loop to all the connections in the allSocket array, so we can send message from one connections to others connections, like a backend chat application
    })

})


// use postman and https://hoppscotch.io/ for 2 connections

// more explanation on the 01_notes.md in notes folder