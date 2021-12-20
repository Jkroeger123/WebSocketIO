const io = require('socket.io')(5000, {
    cors: {
      origins: ["*"],
      handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
          "Access-Control-Allow-Headers": "my-custom-header",
          "Access-Control-Allow-Credentials": true,
        });
        res.end();
      },
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