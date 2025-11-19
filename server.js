



const express = require('express');
const http = require('http');
const { connect } = require('http2');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('Public'));

server.listen(3000, () =>{
    console.log("server start")
})




let players ={}

let number = 0;

io.on("connection", socket =>{
    console.log("connected:", socket.id);
    if (number > 3) {
        return;
    }
    number = number+1;
    players[socket.id] = number;
    console.log("server your player nyumber:", number);
    socket.emit("playerNumber", number);
    

    socket.on("uppos", data =>{
        socket.broadcast.emit("playermoved", data);
    });

    socket.on("disconnect", ()=>{
    number-1;
    
    delete players[socket.id];
    console.log("player disconneted", socket.id)
}   );


})
