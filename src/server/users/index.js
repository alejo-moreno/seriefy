import User from 'src/server/models';


export function getUserById(profileId, callback) {
    User.findOne({ provider_id: profileId }, (err, user) => {
        if (err) return callback(err);
        callback(null, user);
    });
}
