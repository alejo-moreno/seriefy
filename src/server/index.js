import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import socketio from 'socket.io';
import config from 'config';

import api from 'src/server/api';
import {addVotes, incrementVote} from 'src/server/vote';

import passportIndex from 'src/server/passport';

passportIndex(passport);


const app = express();
const server = http.createServer(app);
const io = socketio(server);


mongoose.connect('mongodb://localhost/seriefy');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(expressSession({
    secret: 'my-secret-is-just-mine',
    resave: false,
    saveUninitialized: false
}));

//Configuración de Express
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use('/api', api);



//Rutas de passport
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/twitter/callback', passport.authenticate('twitter',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

//rutas principales



function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}



//Manejo de socketio
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





