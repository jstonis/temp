var productModel = require('../models/products.mock.json'),
    reviewModel = require('../models/reviews.mock.json'),
    userModel = require('../models/user.mock.json'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('lodash');

module.exports = function(app) {
    app.get("/api/project/product", findAllProducts);

    app.get("/api/project/product/car-makes", getCarMakes);
    app.get('/api/project/product/exterior', getExterior);
    app.get('/api/project/product/interior', getInterior);
    app.get('/api/project/product/accessory', getAccessory);
    app.get('/api/project/product/carkit', getCarKit);
    
    app.get("/api/project/product/:productId", getProductById);
    app.delete("/api/project/product/:productId", deleteProductById);
    app.get("/api/project/product/:productId/reviews", getProductReviews);

    app.get("/api/project/user/reviews/:userId", getUserReviews);
    
    app.post("/api/project/product", createProduct);

    
    //app.post("/api/project/register", register);

    function findAllProducts(req, res) {
        Product.find({},function(err,products){
            if(err){
                res.send({error:true,message:"error getting products"})
                return;
            }
            res.send(products);
        })
    }

    function getProductById(req, res) {
        var productId = req.params.productId;
        if(!productId){
            res.send({message:"ProductId is required"});
            return;
        }
        Product.findOne({_id:productId},function(err,product){
            if(err){
                res.send({error:true,message:"error getting product"})
                return;
            }
            res.send(product);
        })
    }

    function deleteProductById(req,res){
        var productId = req.params.productId;
        Product.remove({_id:productId},function(err){
            if(err){
                res.send({error:true,message:"error getting products"})
                return;
            }
            findAllProducts(req,res);
        })
    }

    function getProductReviews(req, res) {
        var productId = req.params.productId;
        if(!productId){
            res.send({message:"ProductId is requires"});
            return;
        }
        var data = [];
        reviewModel.forEach(function(review){
            if(review.productId == productId)
                data.push(review);
        })

        //populate username
        data.forEach(function(review){
            var user = _.find(userModel,{_id:review.userId});
            review.user = user.username;
        })
        res.json(data)
        
    }

    function getUserReviews(req,res){
        var userId = req.params.userId;
        var reviews = _.filter(reviewModel,{userId:userId});
        reviews.forEach(function(review){
            var product =_.find(productModel,{_id: review.productId})
            if(product){
                review.product = product
            }
        })
        res.send(reviews);
    }

    function createProduct(req, res){
        var product = req.body;

        if(!product){
            res.send({message:"product is required"});
            return
        }

        var product = new Product(product);
        product.save(function(err){
            if(err){
                throw err;
                res.send({error:true,message:"error creating product"})
                return
            }
            res.send({message:"OK"});
        })
        
    }

    function getCarMakes(req,res) {
        Product
         .distinct('carMakes',function(err,result){
            if(err){
                throw err;
                res.send({error:true,message:"error getting carMakes"})
                return
            }
            res.send(result);
         })
    }

    function getExterior(req,res){
        Product.find({description:'exterior'},function(err,result){
            if(err){
                throw err;
                res.send({error:true,message:"error getting exterior"})
                return
            }
            res.send(result);
        })
    }

    function getInterior(req,res){
        Product.find({description:'interior'},function(err,result){
            if(err){
                throw err;
                res.send({error:true,message:"error getting exterior"})
                return
            }
            res.send(result);
        })
    }

    function getAccessory(req,res){
        Product.find({accessory:true},function(err,result){
            if(err){
                throw err;
                res.send({error:true,message:"error getting exterior"})
                return
            }
            res.send(result);
        })
    }

    function getCarKit(req,res){
        Product.find({carKit:true},function(err,result){
            if(err){
                throw err;
                res.send({error:true,message:"error getting exterior"})
                return
            }
            res.send(result);
        })
    }
}