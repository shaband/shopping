const passport = require('passport');
const User = require('../models/User');
const localStrategy = require('passport-local').Strategy;
const bycrpt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findOne({
        id
    }).then(data => {
        done(null, data);
    }).catch(error => done(error, null));

});
passport.use('local.signup',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true

    }, (req, email, password, done) => {
        var request = req.body;

        let hasErrors=messages.length>0;
        // if(!errors.isEmpty()){
           
    
        //     messages.push(errors.msg);
        // }
        console.log(errors.isEmpty());
        console.log(errors.array());
        console.log('eaaa');
        User.findOne({
            'email': req.body.email
        }, (err, user) => {
            if (err) {
                return done(error);
            }
            if (user) {
                return done(null, false, {
                    message: 'User already exists'
                });
            }
            var newUser = new User({
                name: request.name,
                email: request.email,
                password: bycrpt.hashSync(request.password, bycrpt.genSaltSync(10)),
                phone: request.passport,
            }).save((err, user) => {
                if (err) {
                    return res.send(err);
                }
                console.log(user);
                return done(null, user);
            });



        });

    }));