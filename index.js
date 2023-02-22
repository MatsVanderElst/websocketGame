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


 

  socket.on('keyUp', (targetSocketId, data) => {
    //TODO: check wich key was pressed on the controller
    io.to(targetSocketId).emit('moveUp');
  });

  socket.on('disconnect', () => {
    delete clients[socket.id];
  });
});

app.use(express.static('public'));

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});