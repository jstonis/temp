/**
 * Created by Josceyn on 2/26/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController)
        .controller("ModalInstanceCtrl",ModalInstanceCtrl)

    function FieldController($scope, $routeParams, $rootScope, FieldService,$uibModal){
    	var self = this;

    	var formId = $routeParams.formId;

    	FieldService
    		.getFieldsForForm(formId)
    		.then(function(response){
    			self.fields = response.data[0].fields;
    		},function(err){
    			self.message = "Error getting fields";
    		})

    	self.addField = function(fieldType){
    		var field = {};
    		switch (fieldType) {
    			case "TEXT" :
    				field = { "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
    				break;

    			case "DATE" :
    				field = {
				        "_id": "null",
				        "label" : "Date",
				        "type" : "DATE"
				    };
				    break;

    			case "DROPDOWN" :
    				field = { "label": "New Dropdown", "type": "DROPDOWN", "options": [
						{"label": "Option 1", "value": "OPTION_1"},
						{"label": "Option 2", "value": "OPTION_2"},
						{"label": "Option 3", "value": "OPTION_3"}
					]};
				    break;

    			case "CHECKBOXES" :
    				field = { "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
						{"label": "Option A", "value": "OPTION_A"},
						{"label": "Option B", "value": "OPTION_B"},
						{"label": "Option C", "value": "OPTION_C"}
					]};
				    break;

    			case "OPTIONS" :
    				field = { "label": "New Radio Buttons", "type": "OPTIONS", "options": [
						{"label": "Option X", "value": "OPTION_X"},
						{"label": "Option Y", "value": "OPTION_Y"},
						{"label": "Option Z", "value": "OPTION_Z"}
					]};
				    break;

    			case "TEXTAREA" :
    				field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
				    break;
    		}

    		FieldService
    			.createFieldForForm(formId,field)
    			.then(function(response){
    				self.fields = response.data.fields;
    			},function(err){
    				self.message = "Error adding field"
    			});
    	}

    	self.deleteField= function(fieldId){
    		FieldService
    			.deleteFieldFromForm(formId,fieldId)
    			.then(function(response){
    				self.fields = response.data.fields;
    			},function(err){
    				self.message = "Error adding field"
    			})
    	}

        self.open = function(field){
        var templateText ='';
        switch(field.type){
            case "TEXT":
            case "TEXTAREA":
                templateText= 'text.html';
                break;
            case "DATE":
                templateText= 'date.html';
                break;
            default:
                templateText= 'other.html';
        }
         var modalInstance = $uibModal.open({
              templateUrl: templateText,
              controller: 'ModalInstanceCtrl',
              size: 'sm',
              resolve: {
                field: function () {
                  return field;
                }
              }
            });
        }
    }

    function ModalInstanceCtrl($uibModalInstance,$scope,field){
        $scope.field = field;
        if(field.options){
            $scope.field.display = $scope.field.options.map(function(a){
                return a.label+':'+a.value;
            }).join('\n')
        }
        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();