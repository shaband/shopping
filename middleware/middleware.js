module.exports = {
  auth: (req, res, next) => {
    console.log("auth");
    if (req.isAuthenticated()) {
      return next();
    }
    console.log("aaa");
    return res.redirect("/");
  },
  unauth: (req, res, next) => {
    console.log("wwww");
    if (req.isUnauthenticated()) {
      return next();
    }
    console.log("tttt");
    return res.redirect("/");
  },
  checkAuth: (req, res, next) => {
    res.locals.login = req.isAuthenticated();
    next();
  }
};
