var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));




// parse application/json
app.use(bodyParser.json());
app.use(session({secret: 's3cr3t', cookie: {maxAge: 600000000}}));
require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, ipaddress);


