'use strict';

let express = require('express');
let router = express.Router();
let User = require('../models/user');

// GET /profile
router.get('/profile', function (req, res, next) {
  if (! req.session.userId ) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId).exec(function( error, user ) {
    if (error) {
      return next(error);
    } else {
      return res.render('profile', {
        title: 'Profile: ' + user.alias,
        alias: user.alias
      });
    }
  });
});

// GET /login
router.get('/login', function (req, res, next) {
  return res.render('login', {
    title: 'User Login'
  });
});

// GET /logout
router.get('/logout', function (req, res, next) {
  if ( req.session.userId ) {
    req.session.destroy()
  }
  return res.render('index', {
    title: 'Home'
  });  
});

// POST /login
router.post('/login', function (req, res, next) {
  if (req.body.email && req.body.password) {
    // Authenticate
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    let err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', function (req, res, next) {
  return res.render('register', {
    title: 'User Registration'
  });
});

// POST /register
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
        password: req.body.password
      };

      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });

    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

});

// GET /
router.get('/', function (req, res, next) {
  return res.render('index', {
    title: 'Home'
  });
});

module.exports = router;