$(function () {
    // var socket = io('http://localhost:3002/')
    var socket = io()

    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    ctx.fillStyle = 'black'

    var isDrawing = false
    var ox, oy
    canvas.addEventListener('mousedown', function (e) {
        e.preventDefault()
        isDrawing = true
        var x = e.offsetX
        var y = e.offsetY
        ox = x
        oy = y
    })


    canvas.addEventListener('mousemove', function (e) {
        e.preventDefault()
        if (isDrawing) {
            var x = e.offsetX
            var y = e.offsetY
            draw(ox, oy, x, y)
            emit_drawing({ox, oy, x, y})
            ox = x
            oy = y
        }
    })
    canvas.addEventListener('mouseup', function (e) {
        e.preventDefault()
        isDrawing = false
    })

    function draw(ox, oy, x, y) {
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.lineCap = 'round'
        ctx.moveTo(ox, oy)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.closePath()
    }

    // Send data to server.................................................
    function emit_drawing({ox, oy, x, y}) {
        socket.emit('emit_drawing', {ox, oy, x, y})
    }

    // Listening...........................................................
    socket.on('listen_drawing', function ({ox, oy, x, y}) {
        draw(ox, oy, x, y)
    })

})