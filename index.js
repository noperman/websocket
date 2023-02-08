const port = 5021
const allowedOrigins = ["http://localhost:3000"]

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET"]
  }
});

io.of("/einvitation").on("connection", (socket)=>{
  socket.on("room", room => {
    socket.join(room)
  })
  
  socket.on("ToServerRoomBroadcast", (payload) => {
    io.to(payload.room).emit("ToClientRoomBroadcast", payload.data)
  })
})

// io.of("/namespaceorchannelname").adapter.on("create-room", (room) => {
//   console.log(`room ${room} was created`);
// });

// io.of("/").adapter.on("join-room", (room, id) => {
//   console.log(`socket ${id} has joined room ${room}`);
// });

// io.of("/").adapter.on("leave-room", (id) => {
//   console.log(`socket ${id} was leave from room`);
// });

// io.of("/").adapter.on("delete-room", (id) => {
//   console.log(`socket ${id} was deleted from room`);
// });

// io.of("/channel_path_ex_orders").on("connection", (socket)=>{
//   console.log('a user of  connected channel_path_ex_orders ');
// })

server.listen(port, () => {
  console.log('listening on localhost:'+port);
});