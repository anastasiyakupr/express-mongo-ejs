'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Create Schema
var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	emailHash: {
		type: String
	},
	password:  {
		type: String,
		required: true
	},
	alias: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	xp: {
		type: Number,
		default: 100
	},
	lvl: {
		type: Number,
		default: 1
	},
	kudos: {
		type: Number,
		default: 1
	},
	role: {
		type: Number,
		default: 10
	},
	updatedOn: {
		type: Date,
		default: Date.now()
	},
	createdOn: {
		type: Date,
		default: Date.now()
	}
});

// Authentication
UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({ email: email }).exec(function(error, user) {
		if (error) {
			return callback(error);
		} else if (!user) {
			var err = new Error('User not found.');
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, user.password, function(error, result) {
			if (result === true) {
				return callback(null, user);
			} else {
				return callback();
			}
		});
	});
};

// Hash/Salt Password
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// UserSchema.pre('update', function(next) {
// 	var user = this;
// 	user.update({ updatedOn: Date.now() });
// 	next();
// });

var User = mongoose.model('User', UserSchema);
module.exports = User;