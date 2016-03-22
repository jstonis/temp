/**
 * Created by Josceyn on 3/11/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("CarBrandsController", CarBrandsController)


    function CarBrandsController($scope, UserService, $location, $rootScope, ProductsService){
    	var self = this;

    	ProductsService
        	.getCarMakes()
        	.then(function(res){
        		self.carMakes = res.data;
        	},function(err){
        		self.message ="Error fetching carmakes"
        	});


    }


})();