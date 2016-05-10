import Vote from 'src/server/models/vote';
export function incrementVote(id, callback) {

    Vote.findOne({ showId: id }, (err, doc) => {
        if (!err && doc) {
            doc.count++;
            doc.save((err) => {
                if (err) return callback(err);
                callback(null, doc);
            });
        } else {
            let vote = new Vote();
            vote.showId = id;
            vote.count = 1;
            vote.save((err) => {
                if (err) return callback(err);
                callback(null, vote);
            });
        }
    });
}

export function getVotes(callback) {
    Vote.find({}, (err, votes) => {
        if (err) return callback(err);
        callback(null, votes);
    })
}

export function addVotes(shows, callback) {
    getVotes((err, votes) => {
        if (err) votes = [];
        shows = shows.map(show => {
            let vote = votes.filter(vote => vote.showId === show.id)[0];
            show.votes = vote ? vote.count : 0;
            return show;
        });
        callback(shows);
    });
}