var productModel = require('../models/products.mock.json'),
    reviewModel = require('../models/reviews.mock.json'),
    userModel = require('../models/user.mock.json'),
    _ = require('lodash');

module.exports = function(app, model) {
    app.get("/api/project/product", findAllProducts);
    app.get("/api/project/product/:productId", getProductById);
    app.get("/api/project/product/:productId/reviews", getProductReviews);
    app.post("/api/project/product", createProduct);

    app.get("/api/project/product/car-makes", getCarMakes);
    //app.post("/api/project/register", register);

    function findAllProducts(req, res) {
        res.json(productModel);
    }

    function getProductById(req, res) {
        var productId = req.params.productId;
        if(!productId){
            res.send({message:"ProductId is requires"});
            return;
        }

        var data = _.find(productModel,{_id:productId})
        if(data){
            res.json(data)
        }else{
            res.send({message:"No such product"});
        }
        
    }

    function getProductReviews(req, res) {
        var productId = req.params.productId;
        if(!productId){
            res.send({message:"ProductId is requires"});
            return;
        }

        var data = _.find(reviewModel,{_id:productId});

        //populate username
        data.forEach(function(review){
            var user = _.find(userModel,{_id:review.userId});
            review.user = user.username;
        })
        res.json(data)
        
    }

    function createProduct(req, res) {
        res.json(req.session.currentUser);
    }

    function getCarMakes(req, res) {

    }
}