const express = require('express');
const app = express();
const server = require('http').createServer((req, res) => res.end());

const io = require('socket.io')(server, {
  perMessageDeflate :false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    const uid = socket.handshake.query.id;
    socket.join(uid);

    socket.on('send', ({recipient, msg}) => {
        socket.broadcast.to(recipient).emit('receive', {
            sender: uid, message: msg
        })
    })
})

server.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});