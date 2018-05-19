const { check, validationResult } = require('express-validator/check');

module.exports.rules={
signUp:[
  check('name').isLength({min:1}),
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })

  ]
}
