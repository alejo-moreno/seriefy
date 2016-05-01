import Vote from 'src/server/models';
export function incrementVote(id, callback) {

    let onSave = function (vote) {
        return function (err) {
            if (err) callback(err);
            callback(null, vote);
        }
    }

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
                callback(null, doc);
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