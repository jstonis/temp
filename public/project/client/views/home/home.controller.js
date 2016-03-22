/**
 * Created by Josceyn on 2/26/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController)


    function HomeController($scope, ProductsService, $location, $rootScope, UserService){
    	var self = this;
       	ProductsService
       		.findAllProducts()
       		.then(function(res){
       			self.products = res.data;
       		},function(err){
       			self.message = "Error geting products"
       		});
   	}


})();
