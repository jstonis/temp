/**
 * Created by Josceyn on 3/11/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("CartController", CartController)


    function CartController(UserService, $location, $rootScope){
    	var self = this;

    	function init(){
	      	UserService
	    		.getCurrentUser()
	    		.then(function(res){
	    			self.cartItems = res.data.cartItems;	
	    		},function(err){
	    			self.messge = "unablel to get cart details"
	    		})
    	}
    	init();

    	self.removeProduct = function(productId){
    		UserService
    			.removeFromCart(productId)
    			.then(function(res){
    				init();
    			},function(err){
    				self.message = "err removing from cart"
    			})
    	}

    }


})();