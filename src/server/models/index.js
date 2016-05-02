import mongoose from 'mongoose';

let VoteSchema = new mongoose.Schema({
    showId: { type: Number },
    count: { type: Number }
})

let UserSchema = new mongoose.Schema({
    name: String,
    provider: String,
    provider_id: { type: String, unique: true },
    photo: String,
    createdAt: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', VoteSchema)
const User = mongoose.model('User', UserSchema)

module.exports = Vote;
module.exports = User;