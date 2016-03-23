/**
 * Created by Josceyn on 3/11/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("CarKitsController", CarKitsController)


    function CarKitsController($scope, UserService, $location, $rootScope, ProductsService){

        ProductsService
            .getCarKits()
            .then(function(res){
                $scope.carKits= res.data;
            },function(err){
                $scope.message ="err";
            });
        $scope.addToCart=addToCart;

        function addToCart(product){
            if(!$rootScope.currentUser){
                $scope.message ="Please sign in";
                return
            }
            UserService
                .addToCart(product)
                .then(function(res){
                    if(res.data.added = true){
                        $location.url("/cart");
                    }else{
                        $scope.message = res.data.message;
                    }
                },function(err){
                    $scope.message ="err adding to cart"
                });
        }


    }


})();