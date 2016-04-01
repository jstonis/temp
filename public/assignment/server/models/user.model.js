var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {
    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById

    };
    return api;


    function createUser (req,res,user) {
        var userNew = new User({
            username: user.username,
            password: user.password,
            emails : [user.email]
        });

        userNew.save(function(err){
            if(err){
                console.log(err)
                res.send({error: true, message:"Error saving user"})
                return
            }
            req.session.currentUser = userNew;
            res.json(userNew);
        })
    }

    function findUserByUsername (req,res,username) {

        User.find({username: username},function(err,user){
            if(err){
                return res.send({error:true, message:"Unable to find user"})
            }else if(!user){
                res.json({message: "Username not found!"});
            }else{
                res.json(user);
            }
        })
    }

    function findUserByCredentials(req,res,credentials) {

        User.find({username: credentials.username,password: credentials.password},function(err,user){
            if(err){
                return res.send({error:true, message:"Unable to find user"})
            }else if(!user){
                res.json({message: "Invalid credentials"});
            }else{
                req.session.currentUser = user;
                res.json(user);
            }
        })
    }


    function updateUser (userId, user) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u]=user;
               return mock[u]
            }
        }
        return null;

    }

    function findAllUsers(callback){
        return mock;

    }
    function deleteUserById(userId){
        for (var u in mock) {
            if (mock._id === userId) {
                mock[u].remove();
                return mock;
            }
        }
        return null;
    }
    function findUserById(id){
        for(var u in mock){
            if(mock[u]._id==id){
                return mock[u];
            }

        }
        return null;

    }

}