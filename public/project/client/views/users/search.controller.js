/**
 * Created by Josceyn on 3/11/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SearchController", SearchController)


    function SearchController($scope, UserService, $location, $rootScope,ProductsService, UserService,$filter){
        var self = this;
        self.message = "enter term to search";

        self.filteredItems = [];

        self.queryChange = function(){
            self.message = null;
            var items = $filter('filter')(self.allItems, {
                $: self.search
            });

            if(!items){
                vm.message ="No match found"
            }
            vm.filteredItems = items;
        }

        ProductsService
            .findAllProducts()
            .then(function(res){
                self.allItems = res.data;
            },function(err){
                self.message ="err";
            })

    }


})();
