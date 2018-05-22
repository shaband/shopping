const express = require("express");
const router = express.Router();
const _ = require("lodash");
const csurf = require("csurf");
const csrfProtection = csurf();
// models
const Product = require("../models/Product");
const Cart = require("../models/Cart");
// end models

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

let cart=req.session.cart.toArray();

  return res.render("../views/shop/shopping-cart",{cart:cart});
});

module.exports = router;
