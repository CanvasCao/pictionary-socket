var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log(msg)
        // without him
        // socket.broadcast.emit('chat message', msg)

        // to everyone
        // io.emit('chat message', msg)
    })

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
})

http.listen(3001, function () {
    console.log('listening on *:3001')
})