/**
 * Created by Josceyn on 3/3/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($rootScope,$http) {

        var api={
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            getFormByTitle: getFormByTitle
        };
        return api;


        function createFormForUser(userId, form, callback){
            return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
        }

        function getFormByTitle(title, callback){

        }

        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/"+formId,newForm);
        }


    }
})();
