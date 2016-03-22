/**
 * Created by Josceyn on 3/11/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProductDisplayController", ProductDisplayController)


    function ProductDisplayController($scope, UserService, $location, $rootScope, $routeParams, ProductsService){
        var productId = $routeParams.productId,
            self = this;

        ProductsService.getProductById(productId)
            .then(function(res){
                self.products = res.data;
            },function(err){
                self.message="Unable to fetch products"
            });


        $scope.addToCart=addToCart;
        $scope.likeProduct=likeProduct;

        ProductsService.getReviewsByProduct(productId)
            .then(function(res){
                self.reviews = res.data;
            },function(err){
                self.message="Unable to fetch reviews"
            });

        function addToCart(selectedProduct){
            UserService.addToCart(selectedProduct)
            $location.url("/cart");
        }

        function likeProduct(){
                UserService.addLikedProduct();
        }

    }


})();