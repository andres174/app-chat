const express = require('express');

const app = express();

const path = require('path');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
    console.log(`La app se está ejecutando en el puerto: ${port}`);
});

const socket = require('socket.io');

const io = socket(server);

io.on('connection', (socket) => {

    console.log('new connection');

    socket.on('chat:msg', (data) => {
        io.sockets.emit('chat:msgBack', data)
    });

});