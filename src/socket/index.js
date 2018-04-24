export default io => {
    io.sockets.on('connection', socket => {
        socket.username = 'Anon User'
        console.log('A new user has been enter')
        socket.on('SET_USERNAME', data => {
            console.log(data)
            socket.username = data && data.username
        })
        socket.on('SEND_MESSAGE', data => {
            io.sockets.emit('SEND_MESSAGE', { message: data && data.message, username: socket.username })
        })
        socket.on('IS_TYPING', data => {
            socket.broadcast.emit('IS_TYPING', { username: socket.username })
        })
    })
}
