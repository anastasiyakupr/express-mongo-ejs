// MongoDB
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/htmlcore", {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));