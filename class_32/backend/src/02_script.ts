// This code is interecting with our frontend

/* 1st appraoch --- 

    let allSockets = {}; // read Maps and Records, and implement over here.

    ideally this will look like this
    let allSockets = {
    "room1": [socket1, socket2],
    "room2": [socket1],
    "room3": [socket1, socket2, socket3]
    };

*/
/* 2nd appraoch --- 

    interface User {
    socket: WebSocket;
    room: string;
    }
    let allSockets: User[] = [];

    and this will look like this
    [
        {socket: socket1, room: "room1"},
        {socket: socket2, room: "room2"},
        {socket: socket3, room: "room1"},
        {socket: socket4, room: "room1"},
    ]

*/


import { WebSocketServer, type WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 })

interface User {
    socket: WebSocket;
    room: string;
}
let allSockets: User[] = [];

ws.on("connection", function connection(socket) {
    console.log("user connected");

    // Now after user connects with the socket, we will not gonna put that connection on the alsockets array, If the user sends message something like this "{"type": "join","payload": {"roomId": "black"}}", which has a type join then wil will let him in the array with room acceptence.
    socket.on("message", (data) => {

        const parsedMessage = JSON.parse(data as unknown as string) // client will sent backend message like an object of string so the data will look like "{somethings}", and we need to convert that data from string to object

        if (parsedMessage.type === "join") {

            // Remove old entries of this socket
            allSockets = allSockets.filter(user => user.socket !== socket);

            // Add fresh entry
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });

            socket.send(`Joined room: ${parsedMessage.payload.roomId}`);
        }


        if (parsedMessage.type === "chat") {
            const currentUserRoom = allSockets.find(user => user.socket == socket)?.room // black, or red, or blue.

            allSockets.forEach(user => {
                if (user.room === currentUserRoom && user.socket !== socket) {
                    user.socket.send(parsedMessage.payload.message)
                }
            })
        } // now if anyuser wants to chat then we will find him in the allSocket array and gets his roomId and send message to all the sockets or connections for only his room only 

        if (parsedMessage.type === "leave") {
            allSockets = allSockets.filter(user => user.socket !== socket);
            socket.send("You left the room");
        }


    })


    socket.on("close", () => {
        allSockets = allSockets.filter(s => s.socket !== socket);
        console.log("user disconnected");
    }); // when user disconnects we will remove that connection from the allSockets array

})


// okay so for connections put messege like this way: 

/* 
{
    "type": "join",
    "payload": {
        "roomId": "black"
    }
}

{
    "type": "chat",
    "payload": {
        "message": "hello all the users connections in black room"
    }
}
*/