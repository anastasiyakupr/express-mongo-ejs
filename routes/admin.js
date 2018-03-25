'use strict';

let express = require('express');
let router = express.Router();
let mid = require('../middleware');

let User = require('../models/user');

// ==================================================
// GET /admin
// ==================================================
router.get('/', /* mid.requiresLogin,*/function (req, res, next) {

	// User.findById(req.session.userId).exec(function (error, user) {
  //   if (error) {
  //     return next(error);
  //   } else {

  //     console.log('user.firstname: ' + user.firstname + ' | user.lastname: ' + user.lastname + ' | user.alias: ' + user.alias);
  //   }
  // });

  return res.render('admin', {
		title: 'Administration'
	});
	
});

// ==================================================
// GET /admin/users
// ==================================================
router.get('/users', /* mid.requiresLogin, */function (req, res, next) {

  User.find(function( error, user ) {
    if (error) {
      return next(error);
    } else {

      return res.render('admin_users', {
        title: 'Users',
        userlist: user
      });

    }
  });
	
});

module.exports = router;