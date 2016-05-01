import http from 'http';
import express from 'express';
import api from 'src/server/api';
import mongoose from 'mongoose';
import socketio from 'socket.io';
import {addVotes, incrementVote} from 'src/server/vote';

const app = express();
const server = http.createServer(app);
const io = socketio(server);


mongoose.connect('mongodb://localhost/seriefy');


app.use(express.static('public'));
app.use('/api', api);

io.on('connection', socket => {
    console.log(`Cliente ${socket.id} conectado`);

    socket.on('shows', (shows) => {
        addVotes(shows, (shows) => {
            socket.emit('shows:done', shows);
        })
    });

    socket.on('vote', (id) => {
        incrementVote(id, (err, vote) => {
            if (err) return socket.emit('vote:error', error);
            io.sockets.emit('vote:done', vote);
        })
    });

    socket.on('join', room => {
        socket.room = room
        socket.join(room)
    });

    socket.on('message', msg => {
        socket.broadcast.to(socket.room).emit('message', msg)
    });

})

server.listen(3000, () => console.log("Escuchando en el puerto 3000"))





