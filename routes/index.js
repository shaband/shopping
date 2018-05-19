var express = require('express');
var router = express.Router();
var _=require('lodash');

var csurf = require('csurf')
var csrfProtection = csurf();

var Product=require('../models/Product');


/* GET home page. */
router.get('/', function(req, res, next) {
 Product.find().then((data)=>{
 products=_.chunk(data,3);
  return  res.render('shop/index', { products});
 }).catch((err)=> console.log);
});

module.exports = router;
