import mongoose from 'mongoose';
import User from 'src/server/models';
import {getUserById} from 'src/server/users';
import config from 'config';

var TwitterStrategy = require('passport-twitter').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
var passportConfig = config.get('development.passportConfig');


export default function (passport) {

    passport.serializeUser(function (user, done) {
        console.log("serializo" + user.id)
        done(null, user.id);
    });



    passport.deserializeUser(function (id, done) {
        console.log("deserializo" + id);
        getUserById(id, user => {
            done(null, user);
        });
    });

    passport.use(new TwitterStrategy({
        consumerKey: passportConfig.TWITTER_CONSUMER_KEY,
        consumerSecret: passportConfig.TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter/callback'
    }, function (accessToken, refreshToken, profile, done) {
        getUserById(profile.id, function (err, user) {
            if (err) throw (err);
            if (!err && user != null) return done(null, user);

            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            user.save(function (err) {
                if (err) throw err;
                done(null, user);
            });
        });
    }));

    /* passport.use(new FacebookStrategy({
         clientID: process.env.FACEBOOK_APP_CLIENT_ID,
         clientSecret: process.env.FACEBOOK_APP_SECRET_ID,
         callbackURL: '/auth/facebook/callback'
     }, function (accessToken, refreshToken, profile, done) {
         User.findOne({ provider_id: profile.id }, function (err, user) {
             if (err) throw (err);
             if (!err && user != null) return done(null, user);
 
             var user = new User({
                 provider_id: profile.id,
                 provider: profile.provider,
                 name: profile.displayName,
                 photo: profile.photos[0].value
             });
             user.save(function (err) {
                 if (err) throw err;
                 done(null, user);
             });
         });
     }));*/
}