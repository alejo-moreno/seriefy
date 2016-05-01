import express from 'express';
import tvmaze from 'tv-maze';
import {getVotes, addVotes, incrementVote} from 'src/server/vote';

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

    client.search({ q: query }, (err, data) => {
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


export default router;