const express = require('express')
const app = express()
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const clients = {};
io.on('connection', socket => {
  
  console.log('Socket connected', socket.id);

  socket.on('message', message => {
    console.log('message', message);
    io.sockets.emit(`message`, message);
  });
});

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});