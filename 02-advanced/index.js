var express = require('express');
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log(msg)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
})

http.listen(3002, function () {
    console.log('listening on *:3002')
})