module.exports = {
  auth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/");
  },
  unauth: (req, res, next) => {
    if (req.isUnauthenticated()) {
      return next();
    }
    return res.redirect("/");
  },
  checkAuth: (req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session=req.session;
    next();
  }
};
