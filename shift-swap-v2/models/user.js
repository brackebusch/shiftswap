//models/User.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema(
  {
  name: {type: String, reqired: true},
  email: {type: String, reqired: true},
  phone_number: {type: Number, reqired: true},
  password_digest: {type: String, reqired: true},
  session_token: {type: String}
  }
);
module.exports = mongoose.model('User', userSchema);