var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var hashing = require('./UserHashing.js');
var log = require("log-message");

// User Schema
var User = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
});

// hash the password before the user is saved
User.pre('save', function(next) {
	var user = this;
// Hash the password only if the password has been changed or user is new
if (!user.isModified('password')) return next();
 // generate the hash
 user.password = hashing.hashPassword(user.password);

 next();
});

User.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password,user.password);
};

module.exports = mongoose.model("User",User);