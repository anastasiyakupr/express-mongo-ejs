'use strict';

var mongoose = require('mongoose');

// Create Schema
var ContactSchema = new mongoose.Schema({
	senderID: {
		type: String
	},
	subject: {
		type: String,
		required: true,
		trim: true
	},
	message:  {
		type: String,
		required: true
	}
});

var Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;