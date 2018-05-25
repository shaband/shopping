const express = require("express");
const router = express.Router();
const _ = require("lodash");
const csurf = require("csurf");
const csrfProtection = csurf();

//stripe
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);

// models
const Product = require("../models/Product");
const Cart = require("../models/Cart");
// end models
router.use(csrfProtection);

/* GET home page. */
router.get("/", function(req, res, next) {
  Product.find()
    .then(data => {
      products = _.chunk(data, 3);
      return res.render("shop/index", { products });
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
  // return res.send("aaa");
  let cart = new Cart(req.session.cart || {});

  return res.render("shop/shopping-cart", { cart });
});
router.get("/checkout", (req, res) => {
  // return res.send("aaa");
  let cart = new Cart(req.session.cart || {});
  return res.render("shop/checkout", { cart, csrfToken: req.csrfToken() });
});

module.exports = router;
