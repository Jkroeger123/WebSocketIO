const io = require('socket.io')(5000, {
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