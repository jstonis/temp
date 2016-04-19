/**
 * Created by Josceyn on 3/18/2016.
 */

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');


module.exports = function(app, formsModel, userModel) {

    /*
     * Admin endpoints
     */
    app.post("/api/assignment/admin/user", isAdmin,createNewUser);
    app.get("/api/assignment/admin/user", isAdmin, getUser);
    app.get("/api/assignment/admin/user/:id", isAdmin, getUserById);
    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUserById);
    app.put("/api/assignment/admin/user/:id", isAdmin, updateUserById);
    // admin endpoints end

    app.get("/api/assignment/user", getUser);
    app.get("/api/assignment/user?username=alice&password=wonderland", getUserByCredentials);
    app.post("/api/assignment/login", login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/profile/:userId", profile);

    function getUser(req,res){
        var username = req.query.username;
        var passowrd = req.query.passowrd;

        if(username && passowrd){
            getUserByCredentials(req,res);
        }

        else if (username){
            getUserByUsername(req,res);
        }

        else{
            getAllUsers(req,res);
        }

    }

    function createNewUser(req, res) {
        var user = req.body;

        if(!user){
            res.send({message:"user is required"});
            return
        }

        var user = new User(user);
        user.save(function(err){
            if(err){
                res.send({error:true,message:err.message})
                return
            }
            res.send({message:"OK"});
        })
    }

    function getAllUsers(req, res) {
        User.find({},function(err,users){
            if(err){
                res.send({error: true, message:"Error getting users"})
                return
            }
            res.json(users);
        })
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});

    }

    function getUserByUsername(req, res) {

        var username = req.query.username;
        userModel.findUserByUsername(req,res,username);
    }

    function getUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        var user = userModel.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found!"});
    }

    function updateUserById(req, res) {
          var userId = req.params.id;
          var user = req.body;

          var query = {_id : userId};
          var update = {$set:{
                            username: user.username,
                            password: user.password,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            roles: user.roles
                        }}

          User.update(query,update,{new:true},function(err,user){
            if(err){
                res.send({error:true,message:"error  updating"});
                return
            }
            res.send(200)

          })

    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        User.remove({_id : userId},function(err){
            if(err){
                res.send({error:true,message:"error removing user"})
                return;
            }
            res.send("OK")
        })
    }

    function login(req, res, next) {
      passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
          res.status(400).send(info);
        } else {

          user.password = undefined;
          user.salt = undefined;

          req.login(user, function (err) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.json(user);
            }
          });
        }
      })(req, res, next);
    }

    function profile(req, res) {
        var userId = req.params.userId;
        User.find({_id: userId},function(err,user){
            if(err){
                console.log(err)
                res.send({error: true, message:"Error getting profile"})
                return
            }
            res.json(user);
        })
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;

        if(!user){
            res.send({message:"user is required"});
            return
        }

        var user = new User(user);
        user.save(function(err){
            if(err){
                res.send({error:true,message:err.message})
                return
            }
              req.login(user, function (err) {
                if (err) {
                  res.status(400).send(err);
                } else {
                  res.json(user);
                }
              });
            res.send({message:"OK"});
        })
    }

    function isAdmin(req,res,next) {

        if(!req.user){
            res.send(403)
            return
        }

        if(req.user.roles.indexOf("admin") >= 0) {
            next();
        }else{
            res.send(403)
        }
    }

}