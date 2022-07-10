var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.urlencoded({extent: false}));
app.use(express.json());

const sum = (a, b) => a + b;

io.on('connection', (socket) => {
    console.log('Connesso');

    socket.on('disconnect', () => {
        console.log('Disconnesso');
    });

    socket.on('add', (data) => {
        console.log(data);
        socket.emit('addRes', sum(data.a, data.b));
    });
});

http.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000');
});
