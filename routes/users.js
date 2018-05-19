const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const csrfProtection = csurf();
const passport= require('passport');
const { check, validationResult } = require('express-validator/check');
const {rules}=require('../validation/userRules')

router.use(csrfProtection);

/* GET users listing. */
router.get('/signUp', function(req, res, next) {
// Finds the validation errors in this request and wraps them in an object with handy functions
    let errors = validationResult(req);
    let messages=req.flash('error');
    let hasErrors=messages.length>0;
    if(!errors.isEmpty()){
       

        messages.push(errors.msg);
    }
    console.log(errors.isEmpty());
    console.log(errors.array());
    console.log('eaaa');

return res.render('users/signUp',{csrfToken:req.csrfToken(),messages,hasErrors})
});

router.post('/signUp',rules.signUp,passport.authenticate('local.signup',
{ successRedirect: 'profile',
failureRedirect: 'signUp',
failureFlash: true 
}));
router.get('/profile',(req,res,done)=>{

res.render('users/profile');
});
module.exports = router;
