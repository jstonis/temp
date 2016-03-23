/**
 * Created by Josceyn on 2/26/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, $location, $rootScope, UserService, ProductsService){
        $scope.addProduct=addProduct;
        $scope.removeProduct=removeProduct;
        $scope.selectProduct=selectProduct;
        $scope.updateProduct=updateProduct;
        var callback=null;

        function findAll(){
            ProductsService
            .findAllProducts()
            .then(function(res){
                $scope.products = res.data;
            })
        }

        findAll();

        function addProduct(product){
            $scope.message = null;

            if (product == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            $scope.message = null;
            if (product == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!product.productName) {
                $scope.message = "Please provide a name";
                return;
            }

            ProductsService
                .createProduct(product)
                .then(function(res){
                    findAll();
                },function(err){
                    $scope.message= "err getting products"
                });
        }
        function removeProduct(product){
            ProductsService
                .deleteProductById(product._id)
                .then(function(res){
                    findAll();
                },function(err){
                    $scope.message="err"
                });

        }
        function selectProduct(index){
            var callback=null;
            $scope.selectedFormIndex = index;
            ProductsService.setCurrentProduct($scope.products[index]);

            $scope.newProduct={productName:$scope.products[index].productName, description: $scope.products[index].description,
            accessory: $scope.products[index].accessory, price: $scope.products[index].price, kit: $scope.products[index].kit, carMakes:
            $scope.products[index].carMakes};

        }
        function updateProduct(product){

        }
    }
})();