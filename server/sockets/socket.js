const socketRun = (http) => {
  const io = require('socket.io')(http);

  io.on('connection', (socket) => {
    console.log("a user connected")
    socket.on('sendMessage', (message) => {
      io.emit('broadcast', message)
    })
  });

  io.listen(http)
}

export default socketRun
