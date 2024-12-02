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

    ideally this will look like this
    [
        {socket: socket1, room: "room1"},
        {socket: socket2, room: "room2"},
        {socket: socket3, room: "room1"},
        {socket: socket4, room: "room1"},
    ]

*/



import { WebSocketServer, WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 })

interface User {
    socket: WebSocket;
    room: string;
}
let allSockets: User[] = [];

ws.on("connection", function connection(socket) {

    // now we will not gonna put all the connection on the alsockets array, after connected if anyone tells that connect me to a room then we will push him 
    socket.on("message", (data) => {
        // client will sent backend message like an object of string so the data will look like '{}', and we need to convert that data from string to object
        const parsedMessage = JSON.parse(data as unknown as string)
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        // when the client wants to join in the room then we will push him on the array



        if (parsedMessage.type === "chat") {
            const currentUserRoom = allSockets.find(user => user.socket == socket)?.room

            allSockets.forEach(user => {
                if (user.room === currentUserRoom && user.socket !== socket) {
                    user.socket.send(parsedMessage.payload.message)
                }
            })
        }
        // now if anyuser wants to chat then we will find him in the allSocket array and gets his roomId and send message to all the sockets or connections for only his room only 

    })

})


// okay so for connections put messege like this way: 

/* 
{
    "type": "join",
    "payload": {
        "roomId": "red"
    }
}

{
    "type": "chat",
    "payload": {
        "message": "hello all the hoppscotch connections in red room"
    }
}
*/