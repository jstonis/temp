var userModel = require('../models/user.mock.json'),
    mongoose = require('mongoose'),
    UserPro = mongoose.model('UserPro'),
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
        var userNew = new UserPro({
            username: user.username,
            password: user.password,
            email : user.email,
            cartItems : [],
            roles :['student'],
            likedProducts:[],
            following : []
        });
        userNew.save(function(err){
            if(err){
                throw err;
                res.send({error:true,message:"error registering"})
                return
            }
            req.session.currentUser = userNew;
            res.send(userNew);
        })
    }

    function login(req, res) {
        var credentials = req.body;
        UserPro.findOne(credentials,function(err,user){
            if(err){
                throw err;
                res.send({error:true,message:"error lgoin"})
                return
            }
            req.session.currentUser = user;
            res.send(user)
        })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        var user = req.session.currentUser;
        if(user){
            UserPro.findOne({_id:user._id},function(err,user){
                if(err){
                    throw err;
                    res.send({error:true,message:"error quering user from db"})
                    return
                }
                res.send(user);
            })
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
        UserPro.findOne({_id:user._id},function(err,user){
            if(err){
                throw err;
                res.send({error:true,message:"error quering user from db"})
                return
            }
            var inCart = _.find(user.cartItems,{_id:product._id});
                if(inCart){
                        var query ={_id:user._id,"cartItems._id":product._id};
                        var update = {$inc: {"cartItems.$.quantity":1}}
                        var option = {new : true}
                        UserPro
                            .findOneAndUpdate(query,update,option,function(err,user){
                                if(err){
                                    throw err;
                                    res.send({error:true,message:"error adding to cart"})
                                    return
                                }
                                res.send({added:true});
                            })
                }else{
                        product.quantity = 1;   
                        var query ={_id:user._id};
                        var update = {$push:{cartItems:product}}
                        var option = {new : true}
                        UserPro
                            .findOneAndUpdate(query,update,option,function(err,user){
                                if(err){
                                    throw err;
                                    res.send({error:true,message:"error adding to cart"})
                                    return
                                }
                                res.send({added:true});
                            })
                }
        })

    }

    function removeFromCart(req,res){
        var productId = req.body.productId;
        var user = req.session.currentUser;

        if(!productId || !user) {
            res.send({message:"Either product or user is missing"})
            return
        }
        var query ={_id:user._id};
        var update = {$pull:{cartItems:{_id:productId}}}
        var option = {new : true}
        UserPro
            .findOneAndUpdate(query,update,option,function(err,user){
                if(err){
                    throw err;
                    res.send({error:true,message:"error adding to cart"})
                    return
                }
                res.send(user.cartItems);
            })
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