var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

// global variable
var numUsers = 0

io.on('connection', function (socket) {
    // update numUsers only when added user leaving
    var addedUser = false

    //listening....................................
    socket.on('add_user', function (username) {
        if (addedUser) return

        // save the username
        addedUser = true
        socket.username = username
        numUsers++

        socket.broadcast.emit('user_joined', {
            username: socket.username,
            numUsers: numUsers,
        })
    })

    socket.on('chat_message', function (msg) {
        io.emit('chat_message', {
            username: socket.username,
            message: msg
        })
    })

    socket.on('disconnect', function () {
        if (addedUser && numUsers <= 1) {
            numUsers--

            socket.broadcast.emit('user_left', {
                username: socket.username,
                numUsers: numUsers
            })
        }
    })
})

http.listen(3002, function () {
    console.log('listening on *:3002')
})