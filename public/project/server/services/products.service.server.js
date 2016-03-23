var productModel = require('../models/products.mock.json'),
    reviewModel = require('../models/reviews.mock.json'),
    userModel = require('../models/user.mock.json'),
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
        res.json(productModel);
    }

    function getProductById(req, res) {
        var productId = req.params.productId;
        if(!productId){
            res.send({message:"ProductId is required"});
            return;
        }

        var data = {};
        productModel.forEach(function(product){
            if(product._id == productId)
                data = product;
        })
        res.send(data);
    }

    function deleteProductById(req,res){
        var productId = req.params.productId;
        _.remove(productModel,{_id:productId})
        res.send(productModel);
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
        product._id = (new Date).getTime();
        productModel.push(product);
        res.send({message:"OK"});
    }

    function getCarMakes(req,res) {
        var carMakes=[];
        productModel.forEach(function(product){
            if(product.carMakes){
                product.carMakes.forEach(function(carMake){
                    if(carMakes.indexOf(carMake) == -1)
                        carMakes.push(carMake)
                })
            }
        })
        res.send(carMakes);
    }

    function getExterior(req,res){
        res.send(_.filter(productModel,{description : 'exterior'}));
    }

    function getInterior(req,res){
        res.send(_.filter(productModel,{description : 'interior'}));
    }

    function getAccessory(req,res){
        res.send(_.filter(productModel,{accessory : true}));
    }

    function getCarKit(req,res){
        res.send(_.filter(productModel,{carKit : true}));
    }
}