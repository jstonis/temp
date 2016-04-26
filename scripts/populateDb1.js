var mongoose = require('../mongoose');
var productsMock = require('./products.mock.json');
var usersMock = require('./users.mock.json');
var products =[];
var users =[];
var m = require('mongoose');
var Product = m.model('Product');
var User = m.model('User');
var UserPro = m.model('UserPro');

exports.populate = function(req,res){
	Product.remove({}, function(err) { 
				Product.collection.insert(productsMock,function(err){
				if(err){
					console.log(err);
					console.log(err.getOperation());
					return;
					// Undo Insert	
				}

				populateUsers(req,res);
			});
	});
}


function populateUsers(req,res){
	User.remove({}, function(err) { 
				User.collection.insert(usersMock,function(err){
				if(err){
					console.log(err);
					console.log(err.getOperation());
					return;
					// Undo Insert	
				}
				//populateReviews();
				res.send("OK");
				console.log("SUCCESS")
			});
	});
	UserPro.remove({}, function(err) { 
				UserPro.collection.insert(usersMock,function(err){
				if(err){
					console.log(err);
					console.log(err.getOperation());
					return;
					// Undo Insert	
				}
				console.log("SUCCESS")
			});
	});
}
var randomReviews = ["Awsome product",
					 "Used this product once was worst ever",
					 "Will definitely recommend",
					 "Great product for your car"]
function populateReviews(){
	Product.find({},function(err,results){
		if(err){
			console.log("Error");
			return
		}
		products = results;
			User.find({},function(err,results1){
				if(err){
					console.log("Error");
					return
				}
				users = results1;
				// console.log(products);
				// console.log(users);
				
			})
	})
}