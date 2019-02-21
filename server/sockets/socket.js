const socketRun = (http) => {
  const io = require('socket.io')(http);

  io.on('connection', (socket) => {
    socket.on('join', (gameId) => {
      socket.join(gameId)
    })
    socket.on('sendMessage', (message) => {
      io.to(message.gameId).emit('broadcast', message)
    })
  });

  io.listen(http)
}

export default socketRun
