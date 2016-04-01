/**
 * Created by Josceyn on 3/19/2016.
 */

var mongoose = require('mongoose'),
    Form = mongoose.model('Form');

module.exports = function(app, formsModel, userModel) {

    app.get("/api/assignment/user/:userId/form", getFormsOfUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createNewForm);
    app.put("/api/assignment/form/:formId", updateFormById);


    function getFormsOfUser(req, res){
        var userId=req.params.userId;
        Form.find({userId: userId},function(err,forms){
            if(err){
                return res.send({error:true,message:"error getting form"})
            }
            res.json(forms)
        })
    }
    function getFormById(req, res){
        var id=req.params.formId;
        var form=formsModel.findFormById(id);
        if(form){
            res.json(form);
            return;
        }
        res.json({message: "Form not found!"});
    }
    function deleteFormById(req, res){
        var id=req.params.formId;
        Form.findOneAndRemove({_id:id},function(err){
            if(err){
                res.send({error:true,message:"Unable to remove form"})
                return
            }
            res.send(200)
        })

    }
    function createNewForm(req, res){
       var form=req.body;
        var userId=req.params.userId;
        formsModel.createFormForUser(req,res,userId,form);
    }

    function updateFormById(req, res){
        var formId=req.body._id;
        var title=req.body.title;
        var update = {$set:{title:title}}
        var options = {new: true}
        Form.findByIdAndUpdate({_id: formId},update,options,function(err,forms){
            if(err){
                console.log(err);
                return res.send({error:true,message:"error updating form"})
            }
            res.send(200)
        })
    }


    /*  function getLikes(req, res) {
     var userId = req.param.userId;
     var user = userModel.findUserById(userId);
     var likes = user.likes;
     res.send(likes);
     }

     function login(req, res) {
     var credentials = req.body;
     var user = userModel.findUser(credentials.username, credentials.password);
     res.json(user);
     }

     function like(req, res) {
     var userId = req.params.userId;
     var idIMDB = req.params.idIMDB;
     var user = userModel.userLikesMovie(userId, idIMDB);
     res.json(user);
     }*/
}
