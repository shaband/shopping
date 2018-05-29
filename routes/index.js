const express = require("express");
const router = express.Router();
const _ = require("lodash");
const csurf = require("csurf");
const csrfProtection = csurf();

//stripe
//const keyPublishable = process.env.PUBLISHABLE_KEY;
//const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")("sk_test_NHxNTymzPcy5LhdgB01vgklv");

// models
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
//middleware

const { auth, unauth } = require("../middleware/middleware");
// end models
router.use(csrfProtection);

/* GET home page. */
router.get("/", function(req, res, next) {
  Product.find()
    .then(data => {
      products = _.chunk(data, 3);
      let sucessMsg = req.flash("success")[0];
      return res.render("shop/index", {
        products,
        sucessMsg
      });
    })
    .catch(err => console.log);
});

router.get("/add-to-cart/:id", (req, res) => {
  let productID = req.params.id;
  let cart = new Cart(req.session.cart || {});
  Product.findById(productID)
    .then(product => {
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      return res.redirect("/");
    })
    .catch(err => console.log(err));
});
router.get("/shopping-cart", (req, res) => {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  let cart = new Cart(req.session.cart || {});
  return res.render("shop/shopping-cart", {
    cart
  });
});
router.get("/checkout", auth, (req, res) => {
  // return res.send("aaa");
  let cart = new Cart(req.session.cart || {});
  let errMsg = req.flash("error")[0];

  return res.render("shop/checkout", {
    cart,
    csrfToken: req.csrfToken(),
    errMsg,
    noErrors: !errMsg
  });
});
router.post("/checkout", auth, (req, res) => {
  //  return res.send(req.user);
  // return res.send("aaa");
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  let cart = new Cart(req.session.cart);

  const charge = stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    description: "Example charge",
    source: req.body.stripeToken
  });
  charge.then(data => {
    let order = new Order({
      user: req.user,
      cart: cart,
      name: req.body.name,
      address: req.body.address,
      payment_id: data.id
    }).save();
    order.then(data => {
      req.flash("success", "Successfully bought Product");
      req.session.cart = null;
      return res.redirect("/");
    });
    order.catch(error => {
      return res.sen(error);
    });
  });
  charge.catch(err => {
    req.flash("error", err.message);
    req.redirect("/checkout");
  });
});

module.exports = router;
