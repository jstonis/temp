var userModel = require('../models/user.mock.json'),
    _ = require('lodash');

module.exports = function(app, model) {
    app.post("/api/project/user/login", login);
    app.get("/api/project/user/logout", logout);
    app.get("/api/project/user/loggedin",loggedin);
    app.post("/api/project/user/register", register);
    app.get("/api/project/user/followers/:userId", getFollowers);
    app.post("/api/project/user", register);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:username", findUserByUsername);
    app.get("/api/project/userid/:userId", findUserByUserId);
    app.delete("/api/project/user/:userId", deleteUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.post("/api/project/user/cart/add", addToCart);
    app.post("/api/project/user/cart/remove", removeFromCart);

    function register(req, res) {
        var user = req.body;
        var userNew = {
            _id: (new Date).getTime(), 
            username: user.username,
            password: user.password,
            email : user.email,
            cartItems : [],
            roles :['student'],
            likedProducts:[],
            following : []
        };
        userModel.push(userNew);
        req.session.currentUser = userNew;
        res.json(userNew);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = _.find(userModel,credentials);
        if(user){
            req.session.currentUser = user;
            res.json(user);            
        }else{
            res.send(null);
        }

    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        var user = req.session.currentUser;
        if(user){
            res.json(_.find(userModel,{_id: user._id}));
        }else{
            res.send(null);
        }
    }

    function addToCart(req,res){
        var product = req.body;
        var user = req.session.currentUser;

        if(!product || !user) {
            res.send({added:"false",message:"Either product or user is missing"})
            return
        }

        userModel.forEach(function(u){
            if(user.username  == u.username){
                
                var inCart = _.find(u.cartItems,{_id:product._id});
                if(inCart){
                    inCart.quantity ++;
                }else{
                    product.quantity = 1;
                    u.cartItems.push(product);
                }
            }
        });
        res.send({added: true});
    }

    function removeFromCart(req,res){
        var productId = req.body.productId;
        var user = req.session.currentUser;

        if(!productId || !user) {
            res.send({message:"Either product or user is missing"})
            return
        }

        var user =_.find(userModel,{username: user.username});
        console.log(user);
        console.log(productId);
        _.remove(user.cartItems,{_id: productId})
        res.send(user.cartItems);
    }

    function updateUser(req,res){
        
    }

    function deleteUserById(req,res){
        var userId = req.params.userId;
        _.remove(userModel,{_id:userId});
        res.send(userModel);
    }

    function findUserByUsername(req,res){
        var username = req.params.username;
        var user = _.find(userModel,{username:username});
        if(user){
            res.send(user);
        }else{
            res.send({message:"No such user"});
        }
    }

    function findAllUsers(req,res){
        res.send(userModel);
    }

    function findUserByUserId(req,res){
        var userId = req.params.userId;
        res.send(_.find(userModel,{_id:userId}));
    }

    function getFollowers(req,res){
        var userId = req.params.userId;
        var user = _.find(userModel,{_id:userId});
        if(!user){
            res.send({message:"no such user"})
            return
        }
        var followers =[];
        user.following.forEach(function(userId){
            var user =_.find(userModel,{_id: userId})
            if(user){
                followers.push(user)
            }
        })
        res.send(followers);
    }
}