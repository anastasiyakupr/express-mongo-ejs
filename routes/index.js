'use strict';

let express = require('express');
let router = express.Router();
let mid = require('../middleware');

let User = require('../models/user');

// ==================================================
// GET /
// ==================================================
router.get('/', function (req, res, next) {
  return res.render('index', {
    title: 'Home'
  });
});

// ==================================================
// GET /profile
// ==================================================
router.get('/profile', mid.requiresLogin, function (req, res, next) {

  User.findById(req.session.userId).exec(function (error, user) {
    if (error) {
      return next(error);
    } else {

      console.log('user.firstname: ' + user.firstname + ' | user.lastname: ' + user.lastname + ' | user.alias: ' + user.alias);
    }
  });

  User.findById(req.session.userId).exec(function( error, user ) {
    if (error) {
      return next(error);
    } else {
      
      // ----------------------------------------
      // TODO: Apply when user account is edited.
      // ----------------------------------------
      // let userData = {
      //   updatedOn: Date.now()
      // };
      // user.update(userData, function (error) {
      //   if (error) {
      //     return next(error);
      //   } else {
      //     return next();
      //   }
      // });
      // user.updatedOn = new Date();
      // ----------------------------------------
      // ----------------------------------------

      return res.render('profile', {
        title: 'Profile: ' + user.alias,
        firstName: user.firstName,
        lastName: user.lastName,
        xp: user.xp,
        lvl: user.lvl,
        kudos: user.kudos,
        role: user.role,
        updatedOn: user.updatedOn,
        createdOn: user.createdOn,
        tags: req.query.id
      });
    }
  });
});

// ==================================================
// POST /profile
// ==================================================

// router.post('/profile', mid.requiresLogin, function (req, res, next) {

  // return res.redirect('/profile?id=' + user.userId);

  // Edit User
  // User.(userData, function (error, user) {
  //   if (error) {
  //     return next(error);
  //   } else {
  //     req.session.userId = user._id;
  //     req.session.alias = user.alias;
  //     req.session.email = user.email;
  //     return res.redirect('/profile');
  //   }
  // });

  // let userData = {
  //   alias: req.body.alias,
  //   email: req.body.email,
  //   firstName: req.body.firstname,
  //   lastName: req.body.lastname,
  //   password: req.body.password
  // };

// )};


// ==================================================
// GET /login
// ==================================================
router.get('/login', mid.loggedOut, function (req, res, next) {
  return res.render('login', {
    title: 'User Login'
  });
});

// ==================================================
// POST /login
// ==================================================
router.post('/login', function (req, res, next) {
  if (req.body.email && req.body.password) {
    
    // Authenticate User
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        req.session.alias = user.alias;
        req.session.email = user.email;
        return res.redirect('/profile');
      }
    });
    
  } else {
    let err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// ==================================================
// GET /logout
// ==================================================
router.get('/logout', function (req, res, next) {
  if ( req.session ) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// ==================================================
// GET /register
// ==================================================
router.get('/register', mid.loggedOut, function (req, res, next) {
  return res.render('register', {
    title: 'User Registration'
  });
});

// ==================================================
// POST /register
// ==================================================
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
        alias: req.body.alias,
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
      };

      // Create User
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          req.session.alias = user.alias;
          req.session.email = user.email;
          return res.redirect('/profile');
        }
      });

    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

});

module.exports = router;