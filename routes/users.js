var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var csrfProtection = csurf();
var passport= require('passport');
router.use(csrfProtection);
/* GET users listing. */
router.get('/signUp', function(req, res, next) {
     
    var messages=req.flash('error');
    var hasErrors=messages.length>0;
    console.log(messages);
return res.render('users/signUp',{csrfToken:req.csrfToken(),messages,hasErrors})
});

router.post('/signUp', passport.authenticate('local.signup',
{ successRedirect: 'profile',
failureRedirect: 'signUp',
failureFlash: true 
}));
router.get('/profile',(req,res,done)=>{

res.render('users/profile');
});
module.exports = router;
