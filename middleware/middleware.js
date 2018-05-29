module.exports = {
  auth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.oldUrl = req.url;
    console.log(req.session.oldUrl);
    return res.redirect("/user/signin");
  },
  unauth: (req, res, next) => {
    if (req.isUnauthenticated()) {
      return next();
    }
    return res.redirect("/user/profile");
  },
  checkAuth: (req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
  }
};
