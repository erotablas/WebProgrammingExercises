const { io } = require("socket.io-client");
const socket = io.connect('http://localhost:3000');

const add = (a, b) => {
    socket.emit('add', {a, b});
}

socket.on('addRes', (data) => {
    console.log(data);
});

add(1, 2);
