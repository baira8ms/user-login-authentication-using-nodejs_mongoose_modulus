var log = require("log-message");
var path = require('path');
var express = require('express'); 
var mongoose = require('mongoose'); 
var User = require('./../model/User.js');
var hashing = require('./../model/UserHashing.js');
var apiRouter = express.Router();

apiRouter.route("/login")

.get(function(req, res){
	res.sendFile(path.join(__dirname,"./../html/register.html"));
})

.post(function(req, res){
	User.findOne({
		username: req.body.username
	}).select('username password').exec(function(err, user) {
		if(err) throw err;
		var validPassword = user.comparePassword(hashing.hashPassword(req.body.password));
		if(!validPassword){
			res.sendFile(path.join(__dirname,"./../html/home.html"));
		}else{
			res.json({message:"Login Error: Not an authorized user."});
		}
	});
});

apiRouter.route("/register")
.post(function(req, res){
	var user = new User();
	user.name=req.body.name;
	user.username=req.body.username;
	user.password=req.body.password;
	user.save(function(err) {
		if (err) {
		 // duplicate entry
		 if (err.code == 11000){
		 	return res.json({ success: false, message: 'A user with that username already exists. '});
		 }
		 else
		 	return res.send(err);
		}
		res.json({ message: 'User created!' });
	});
});

module.exports = apiRouter;