var formModel = require("../models/form.model.js")();
var mongoose = require('mongoose'),
    Form = mongoose.model('Form');

module.exports = function(app) {

    app.get("/api/assignment/form/:formId/field", getFieldsOfForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createNewField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);


    function getFieldsOfForm(req, res){
        var formId=req.params.formId;
        Form.find({_id: formId},function(err,forms){
            if(err){
                return res.send({error:true,message:"error getting form fields"})
            }
            res.json(forms)
        })
    }

    function getFieldById(req, res){
        var formId=req.params.formId;
        var fieldId=req.params.fieldId;
        var field=fieldsModel.getFieldsById(formId, fieldId);
        if(field){
            res.json(field);
            return;
        }
        res.json({message: "Field not found!"});
    }
    function deleteFieldById(req, res){
        var formId=req.params.formId;
        var fieldId=req.params.fieldId;
        var update = {$pull:{fields: {_id:fieldId}}};
        var options = {new: true}
        Form.findByIdAndUpdate({_id: formId},update,options,function(err,forms){
            if(err){
                console.log(err);
                return res.send({error:true,message:"error deleting fields"})
            }
            res.json(forms)
        })
    }
    function createNewField(req, res){
        var formId=req.params.formId;
        var field=req.body;
        var update = {$push:{fields: field}};
        var options = {new: true}
        Form.findByIdAndUpdate({_id: formId},update,options,function(err,forms){
            if(err){
                console.log(err);
                return res.send({error:true,message:"error adding form fields"})
            }
            res.json(forms)
        })
    }

    function updateFieldById(req, res){
        var formId=req.params.formId;
        var fieldId=req.params.fieldId;
        var field=req.body;
        fieldsModel.updateFieldObjectById(formId,fieldId,field);
        res.send(200);
    }
};
