let express = require('express');
let router = express.Router();
let User = require('../models/user');

// GET
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Create An Account' });
});

// POST
router.post('/', function(req, res, next) {

  let err;

  if (req.body.email &&
      req.body.alias &&
      req.body.password &&
      req.body.confirmPassword) {

    if (req.body.password !== req.body.confirmPassword) {
      err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    let userData = {
      email: req.body.email,
      alias: req.body.alias,
      password: req.body.email
    };

  } else {
    err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
  let confirm = `
    <h2>Account Created!</h2>
    <p><b>E-Mail:</b> ${req.body.email} </p>
    <p><b>Alias:</b> ${req.body.alias} </p>
    <p><b>Password: </b> ${req.body.password} </p>
  `;

  res.send(confirm);
});

module.exports = router;
