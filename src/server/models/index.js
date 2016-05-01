import mongoose from 'mongoose';

let VoteSchema = new mongoose.Schema({
    showId: { type: Number },
    count: { type: Number }
})

const Vote = mongoose.model('Vote', VoteSchema)
export default Vote;