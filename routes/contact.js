'use strict';

let express = require('express');
let router = express.Router();

let Contact = require('../models/contact');

// ==================================================
// GET /contact
// ==================================================
router.get('/', function (req, res, next) {
  return res.render('contact', {
		title: 'Contact Us',
		subject: '',
    message: ''
  });
});

// ==================================================
// POST /contact
// ==================================================
router.post('/', function (req, res, next) {
  if (req.body.message && req.body.subject) {
    
    let messageData = {
			senderID: req.session.userId,
			subject: req.body.subject,
      message: req.body.message
    };

    Contact.create(messageData, function (error, contact) {
      if (error) {
        return next(error);
      } else {
        return res.render('contact', {
					title: "Message Sent",
					subject: req.body.subject,
          message: req.body.message
        });
      }
    });
    
  } else {
    let err = new Error('We need a message and a subject.');
    err.status = 401;
    return next(err);
  }
});

module.exports = router;