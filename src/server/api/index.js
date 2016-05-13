import express from 'express';
import tvmaze from 'tv-maze';
import {getVotes, addVotes, incrementVote} from 'src/server/vote';
import {getUserById} from 'src/server/users';
import cookieParser from 'cookie-parser';

const router = express.Router();
const client = tvmaze.createClient();


router.get('/show/:id', (req, res) => {
    let id = req.params.id;

    client.show(id, (err, show) => {
        if (err) return res.sendStatus(500).json(err);
        res.json(show);
    })
})

router.get('/shows', (req, res) => {
    console.log('entre a router');
    var pagination = {
        q: 'page?',
        page: 1
    }
    client.shows(null, (err, shows) => {
        if (err) return res.sendStatus(500).json(err);
        addVotes(shows, (shows) => {
            res.json(shows);
        });
    });
});


router.get('/search', (req, res) => {
    let query = req.query.q;

    client.search(query, (err, data) => {

        if (err) res.sendStatus(500).json(err);
        let shows = data.map(data => data.show);

        addVotes(shows, (shows) => {
            res.json(shows);
        });
    })
})


router.post('/vote/:id', (req, res) => {

    let id = req.params.id;

    incrementVote(id, (err, vote) => {
        if (err) return res.sendStatus(500).json(err)
        res.json(vote);
    })


});

router.get('/votes', (req, res) => {
    getVotes((err, docs) => {
        if (err) return res.sendStatus(500).json(err);
        res.json(docs);
    });
});


router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        getUserById(req.user.provider_id, (err, user) => {
            if (err) return res.sendStatus(500).json(err);
            res.cookie('username', user.name, { maxAge: 100000, httpOnly: false });
            return res.json(user);
        });
    }
});



export default router;