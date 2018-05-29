const express = require("express");
const router = express.Router();
const csurf = require("csurf");
const csrfProtection = csurf();
const passport = require("passport");
const { check, validationResult } = require("express-validator/check");
const { rules } = require("../validation/userRules");
const { auth, unauth } = require("../middleware/middleware");

//models

const Order = require("../models/Order");
const Cart = require("../models/Cart");
//end models

router.use(csrfProtection);

/* GET users listing. */
router.get("/signUp", unauth, function(req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  let errors = validationResult(req);
  let messages = req.flash("error");
  let hasErrors = messages.length > 0;

  return res.render("users/signUp", {
    csrfToken: req.csrfToken(),
    messages,
    hasErrors
  });
});

router.post(
  "/signUp",
  rules.signUp,
  passport.authenticate("local.signup", {
    failureRedirect: "signUp",
    failureFlash: true
  }),
  (req, res) => {
    if (req.session.oldUrl) {
      let oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      return res.redirect(oldUrl);
    }
    return res.redirect("profile");
  }
);

router.get("/signin", unauth, (req, res, done) => {
  res.render("users/signIn", { csrfToken: req.csrfToken() });
});

router.post(
  "/signin",
  passport.authenticate("local.signIn", {
    failureFlash: true,
    failureRedirect: "signin"
  }),
  (req, res) => {
    if (req.session.oldUrl) {
      let oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      return res.redirect(oldUrl);
    }
    //  return res.send(req.url);
    return res.redirect("profile");
  }
);

router.get("/profile", auth, (req, res, done) => {
  // return res.send(req.user);

  let orders = Order.find({ user: req.user });
  orders.then(data => {
    res.render("users/profile", { orders: data });
  });
  orders.catch(err => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("errors/error");
  });
});

router.get("/logout", auth, (req, res, done) => {
  req.logout();
  return res.redirect("/");
});
module.exports = router;
