var express = require('express');
var passport = require('passport');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('./mongoose');
var cookieParser  = require('cookie-parser');


// Initialize Models
console.log("Models are being loaded now");
mongoose.loadModels();

//connect to db
mongoose.connect();

app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));




// parse application/json
app.use(bodyParser.json());
app.use(session({secret: process.env.SESSION_SECRET || 's3cr3t',
				 cookie: {maxAge: 600000000},
				 resave: true,
				 saveUninitialized: true
				}));
app.use(cookieParser());

//passport
require('./passport/init')(app)

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, ipaddress);


