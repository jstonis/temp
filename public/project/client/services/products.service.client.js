/**
 * Created by Josceyn on 3/11/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("ProductsService", ProductsService);

    function ProductsService($rootScope,$http) {
        var currentProducts=[];
        currentProducts = {
            getCurrentProduct: getCurrentProduct,
            findAllProducts: findAllProducts,
            setCurrentProduct: setCurrentProduct,
            createProduct: createProduct,
            findProductByName: findProductByName,
            updateProduct: updateProduct,
            deleteProductById: deleteProductById,
            getCarMakes: getCarMakes,
            getExteriorProducts: getExteriorProducts,
            getInteriorProducts: getInteriorProducts,
            getAccessories: getAccessories,
            getCarKits: getCarKits,
            getNumberOfLikes: getNumberOfLikes,
            getReviewsByProduct: getReviewsByProduct,
            getReviewsByUser: getReviewsByUser,
            getReviews: getReviews,
            getProductById: getProductById
        };
        return currentProducts;

        function findAllProducts(){
            return $http.get('/api/project/product');
        }
        function setCurrentProduct (product) {
            $rootScope.currentProduct = product;
        }

        function getCurrentProduct () {
            return $rootScope.currentProduct;
        }

        function createProduct (product) {
            return $http.post("/api/project/product",product);
        }

        function findProductByName (name) {
            for (var u in currentProducts.products) {
                if (currentProducts.products[u].productName === name) {
                    return currentProducts.products[u];
                }
            }
            return null;
        }

        function updateProduct (productId, product) {

        }

        function deleteProductById(productId){
            return $http.delete("/api/project/product/"+productId)
        }

        function getCarMakes() {
            return $http.get('/api/project/product/car-makes');
        }


        function getExteriorProducts(){
            return $http.get('/api/project/product/exterior');
        }

        function getInteriorProducts(){
            return $http.get('/api/project/product/interior');
        }

        function getAccessories(){
            return $http.get('/api/project/product/accessory');
        }

        function getCarKits(){
            return $http.get('/api/project/product/carkit');
        }

        function getNumberOfLikes(product){
            var deferred = $q.defer();
            getProductById()
                .then(function(res){
                    deferred.resolve(res.data.numOfLikes);
                },function(err){
                    deferred.reject();
                })
            return deferred.promise;
        }

        function getReviewsByProduct(productId){
            return $http.get("/api/project/product/"+productId+"/reviews");
        }

        //get reviews by a particular user
        function getReviewsByUser(userId){
            return $http.get("/api/project/user/reviews/"+userId);

        }
        function getReviews(productId) {
            return $http.get("/api/project/product/"+productId+"/reviews");
        }

        function getProductById(productId){ 
            return $http.get("/api/project/product/"+productId);
        }

    }
})();