let express = require('express');
let router = express.Router();
let User = require('../models/user');

// GET
router.get('/register', function (req, res, next) {
  return res.render('register', {
    title: 'User Registration'
  });
});

// POST
router.post('/register', function (req, res, next) {

    if (req.body.email &&
        req.body.alias &&
        req.body.password &&
        req.body.confirmPassword) {

      if (req.body.password !== req.body.confirmPassword) {
        let err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      let userData = {
        email: req.body.email,
        alias: req.body.alias,
        password: req.body.email
      };

      User.create(userData, (error, user) => {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/profile');
        }
      });

    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

  res.send('User Registered!');

});

// GET /
router.get('/', function (req, res, next) {
  return res.render('index', {
    title: 'Home'
  });
});

module.exports = router;