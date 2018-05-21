const passport = require("passport");
const User = require("../models/User");
const localStrategy = require("passport-local").Strategy;
const bycrpt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    id
  })
    .then(data => {
      done(null, data);
    })
    .catch(error => done(error, null));
});
passport.use(
  "local.signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      let errors = validationResult(req);

      let messages = [];
      errors.array().forEach(val => {
        messages.push(val.param + " : " + val.msg);
      });
      if (!errors.isEmpty()) {
        return done(null, false, req.flash("error", messages));
      }
      var request = req.body;
      User.findOne(
        {
          email: req.body.email
        },
        (err, user) => {
          if (err) {
            return done(error);
          }
          if (user) {
            return done(null, false, {
              message: "User already exists"
            });
          }
          var newUser = new User({
            name: request.name,
            email: request.email,
            password: bycrpt.hashSync(request.password, bycrpt.genSaltSync(10)),
            phone: request.passport
          }).save((err, user) => {
            if (err) {
              return res.send(err);
            }
            return done(null, user);
          });
        }
      );
    }
  )
);

passport.use(
  "local.signIn",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {

      var request = req.body;
      User.findOne(
        {
          email: email
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: "email not exists"
            });
          }
        
          if (!bycrpt.compareSync(request.password, user.password)) {
            return done(null, false, { message: "Wrong Password" });
          }
          return done(null, user);
        }
      );
    }
  )
);
