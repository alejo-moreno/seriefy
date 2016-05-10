import mongoose from 'mongoose';


let UserSchema = new mongoose.Schema({
    name: String,
    provider: String,
    provider_id: { type: String, unique: true },
    photo: String,
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', UserSchema)

module.exports = User;
