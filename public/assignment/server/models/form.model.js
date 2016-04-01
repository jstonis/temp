var mongoose = require('mongoose'),
    Form = mongoose.model('Form');

module.exports = function() {
    var api = {
        findFormByTitle: findFormByTitle,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        setCurrentForm: setCurrentForm,
        getCurrentForm: getCurrentForm,
        getFormByTitle: getFormByTitle,
        findFormById: findFormById,
        getAllFieldsByFormId: getAllFieldsByFormId,
        getFieldById: getFieldById,
        deleteFieldById: deleteFieldById,
        createFieldByFormId: createFieldByFormId,
        updateFieldObjectById: updateFieldObjectById

    };
    return api;

    function setCurrentForm (form) {
        $rootScope.currentForm = form;
    }

    function getCurrentForm () {
        return $rootScope.form;
    }
    function findFormByTitle(title){
        for(var u in forms){
            if(forms[u].title=title){}
            return forms[u];
        }
        return null;
    }
    function findFormById(id){
        for(var u in forms){
            if(forms[u]._id=id){}
            return forms[u];
        }
        return null;
    }

    function createFormForUser(req,res,userId, form){
        var form = new Form({
            userId: userId,
            title: form.title,
            fields: []
        });
        form.save(function(err){
            if(err){
                console.log(err)
                res.send({error: true, message:"Error saving form"})
                return
            }
            res.json(form);
        })

    }

    function findAllFormsForUser(userId){
        var formsForUser=[];

       /* for (var u in allForms.forms) {
            if (allForms.forms[u].userId==userId) {
                formsForUser.push(allForms.forms[u]);
            }
        }*/
        console.log(userId) 
        for (var u in forms) {
            if (forms[u].userId == userId) {
                formsForUser.push(forms[u]);
            }
        }
        return formsForUser;
    }

    function deleteFormById(formId){
        /*for (var u in allForms.forms) {
            if (allForms.forms[u]._id==formId) {
                allForms.forms.splice(u,1);
                callback=allForms.forms;
                console.log(allForms.forms);
                return callback;
            }
        }*/
        for (var u in forms) {
            if (forms[u]._id==formId) {
                forms.splice(u,1);
            }
        }

        return null;
    }
    function getFormByTitle(title, callback){
        for (var u in forms){
            if(forms[u].title=title){
                callback=forms[u];
                return callback;
            }
        }
        return null;
    }

    function updateFormById(formId, newForm){
       /* for (var u in allForms.forms) {
            console.log("going through forms:"+ allForms.forms[u]._id);
            console.log("selected form id: " + formId);
            if (allForms.forms[u]._id === formId) {
                console.log("update form found!");
                allForms.forms[u]=newForm;
                callback=allForms.forms[u];
                return callback;
            }
        }*/
        for (var u in forms) {
            if (forms[u]._id == formId) {
                forms[u].title=newForm.title;
            }
        }
        return null;

    }
    function getAllFieldsByFormId(formId){
        for (var u in forms) {
            if (forms[u]._id === formId) {
                return forms[u].fields;
            }
        }
        return null;
    }
    function getFieldById(formId, fieldId){
        for(var v in forms) {
            if(forms[v]._id==formId) {
                for (var u in forms[v].fields) {
                    if (forms[v].fields[u]._id === fieldId) {
                        return forms[v].fields[u];
                    }
                }
            }
        }
        return null;
    }
    function deleteFieldById(formId, fieldId){
        var data;
        for(var v in forms) {
            if(forms[v]._id == formId) {
                for (var u in forms[v].fields) {
                    if (forms[v].fields[u]._id == fieldId) {
                        forms[v].fields.splice(u,1);
                        data = forms[v].fields;
                    }
                }
            }
        }
        return data;
    }
    function createFieldByFormId(formId, field){
        var fields;
        field._id = (new Date).getTime();
        for(var u in forms){
            if(forms[u]._id==formId){
                forms[u].fields.push(field);
                fields = forms[u].fields;
            }
        }
        return fields;
    }
    function updateFieldObjectById(formId, fieldId, field){
        for(var v in forms) {
            if(forms[v]._id==formId) {
                for (var u in forms[v].fields) {
                    if (forms[v].fields[u]._id === fieldId) {
                        forms[v].fields[u]=field;
                        return;
                    }
                }
            }
        }
        return null;
    }

}