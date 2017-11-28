'use strict';

// let User = require('../models/user');
// function lastUpdated(req, res, next) {
// 	let userData = {
// 		$set: {updatedOn: Date.now()}
// 	};
// 	User.update(userData, function (error) {
// 		if (error) {
// 			return next(error);
// 		} else {
// 			return next();
// 		}
// 	});
// }

let User = require('../models/user');
function lastUpdated(req, res, next) {
	User.findById(req.session.userId).exec(function( error, user ) {
    if (error) {
      return next(error);
    } else {
			// let userData = {
			// 	updatedOn: Date.now()
			// };
			// User.update(userData, function (error) {
			// 	if (error) {
			// 		return next(error);
			// 	} else {
			// 		return next();
			// 	}
			// });
		}
	});
}

function loggedOut(req, res, next) {
	if (req.session && req.session.userId) {
		return res.redirect('/profile');
	}
	return next();
}

function requiresLogin(req, res, next) {
	if (req.session && req.session.userId) {
		return next();
	} else {
		var err = new Error('You must be logged in to view this page.');
		err.status = 401;
		return next(err);
	}
}

// module.exports.lastUpdated = lastUpdated;
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;