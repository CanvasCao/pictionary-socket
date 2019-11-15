$(function () {
    // var socket = io('http://localhost:3002/')
    var socket = io()


    // Send data to server.................................................
    // Send chatting message
    $('form').submit(function (e) {
        e.preventDefault()
        socket.emit('chat_message', $('#m').val())
        $('#m').val('')
        return false
    })

    // Tell the server your username
    socket.emit('add_user', 'user' + parseInt(Math.random() * 1000))


    // Listening...........................................................
    socket.on('chat_message', function (data) {
        $('#messages').append($('<li>').text(
            `${data.username}: ${data.message}`)
        )
    })

    socket.on('user_joined', function (data) {
        $('#messages').append($('<li>').text(
            `${data.username} joined, we have ${data.numUsers} users in the room`)
        )
    })

    socket.on('user_left', function (data) {
        $('#messages').append($('<li>').text(
            `${data.username} left, we have ${data.numUsers} users in the room`)
        )
    })
})