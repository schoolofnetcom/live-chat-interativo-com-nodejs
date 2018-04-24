$(function () {
    const socket = io.connect('http://localhost:3000')

    const textMessage = $("#txt-message")
    const textUsername = $("#txt-username")
    const btnSendMessage = $("#btn-send-message")
    const btnSetUsername = $("#btn-set-username")
    const isTyping = $("#feedback-typing")
    const chatroom = $("#box-messages")

    const clear = () => {
        isTyping.html('')
        textMessage.val('')
    }

    btnSendMessage.on('click', () => ( socket.emit('SEND_MESSAGE', { message: textMessage.val() }) ))  
    btnSetUsername.on('click', () => ( socket.emit('SET_USERNAME', { username: textUsername.val() })))
    textMessage.on('keypress', () => ( socket.emit('IS_TYPING') ))
    
    // socket.on("SEND_MESSAGE", ({ username, message}) => {
    socket.on('SEND_MESSAGE', (data) => {
        const { message, username } = data
        
        let tmpl = `<p class="message">${username} : ${message}</p>`
        chatroom.append(tmpl)
        
        clear()
    })
    
    // socket.on('IS_TYPING', ({ username }) => {
    socket.on('IS_TYPING', (data) => {
        const { username } = data
        
        let tmpl = `<p><i>${username} está escrevendo...</i></p>`
        isTyping.html(tmpl)
    })    
});