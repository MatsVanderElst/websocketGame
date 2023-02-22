const express = require('express')
const app = express()
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const clients = {};
io.on('connection', socket => {
  clients[socket.id] = { steps: 0 };
  console.log('Socket connected', socket.id);




  socket.on('move', (data) => {
    //TODO: check wich key was pressed on the controller
    /* io.to(targetSocketId).emit('moveUp'); */
    console.log(data);
    switch (data.direction) {
      case "moveUp":
        io.to(data.targetSocketId).emit('moveUp');
        console.log("sent up direction")
        break;
      case "moveDown":
        io.to(data.targetSocketId).emit('moveDown');
        console.log("sent down direction")
        break;
      case "moveLeft":
        io.to(data.targetSocketId).emit('moveLeft');
        console.log("sent left direction")
        break;
      case "moveRight":
        io.to(data.targetSocketId).emit('moveRight');
        console.log("sent right direction")
        break;


      default:
        break;
    }
    
  });

  socket.on('disconnect', () => {
    delete clients[socket.id];
  });
});

app.use(express.static('public'));

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});