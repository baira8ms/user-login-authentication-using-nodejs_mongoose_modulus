// CALL THE PACKAGES --------------------
var express = require('express'); // call express
 var app = express(); // define our app using express
 var bodyParser = require('body-parser'); // get body-parser
 var morgan = require('morgan'); // used to see requests
 var mongoose = require('mongoose'); // for working w/ our database
 var log = require("log-message");
 var path = require('path');
 //var port = process.env.PORT || 8080; // set the port for our app
 var api = require("./lib/api.js");
 var config = require('./configurations/config.js'); // get our config file
 var port = config.port; // set the port for our app
 var session = require("express-session");

 // APP CONFIGURATION ---------------------
 // use body parser so we can grab information from POST requests
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 //Adding session handling
 app.use(session({secret:config.sessionSecret}));
 
 // configure our app to handle CORS requests
 app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
 Authorization');
 next();
 });

// log all requests to the console
app.use(morgan('dev'));

mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.get("/",function(req,res){
 	//res.redirect("/api/login");
 	if(req.session.sessData)
 	{
 		res.sendFile(path.join(__dirname,"./html/home.html"));
 		//res.json({message:'welcome, '+req.session.sessData.username});
 	} else{
 		
	 	res.sendFile(path.join(__dirname,"./html/login.html"));
 	}
 	
 });

app.use("/api",api);

app.listen(port);
console.log('Magic happens on port ' + port);