/**
 * Created by Josceyn on 2/27/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: 'model'
                })
                .when("/search", {
                    templateUrl: "views/users/search.view.html",
                    controller: "SearchController",
                    controllerAs: 'model'
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: 'model'
                })
                .when("/profile/:userId", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: 'model',
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/admin", {
                 templateUrl: "views/admin/admin.view.html",
                 controller: "AdminController",
                    controllerAs: 'model'
                 })
                 .when("/home", {
                 templateUrl: "views/home/home.view.html",
                   controller: "HomeController",
                   controllerAs : 'model'

                 })
                 .when("/forms", {
                 templateUrl: "views/forms/forms.view.html",
                   controller: "FormController",
                    controllerAs: 'model'
                 })
                .when("/accessories", {
                    templateUrl: "views/users/accessories.html",
                    controller: "AccessoriesController",
                    controllerAs: 'model',
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/carbrands", {
                    templateUrl: "views/users/carbrands.html",
                    controller: "CarBrandsController",
                    controllerAs: 'model',
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/carkits", {
                    templateUrl: "views/users/carkits.html",
                    controller: "CarKitsController",
                    controllerAs: 'model',
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/cart", {
                    templateUrl: "views/users/cart.html",
                    controller: "CartController",
                    controllerAs: 'model',
                    resolve:{
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/exteriorcleaning", {
                    templateUrl: "views/users/exteriorcleaning.html",
                    controller: "ExteriorCleaningController",
                    controllerAs: 'model',
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/finishorder", {
                    templateUrl: "views/users/finishorder.html",
                    controller: "FinishOrderController",
                    controllerAs: 'model'
                })
                .when("/interiorcleaning", {
                    templateUrl: "views/users/interiorcleaning.html",
                    controller: "InteriorCleaningController",
                    controllerAs: 'model',
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/orderconfirmation", {
                    templateUrl: "views/users/orderconfirmation.html",
                    controller: "OrderConfirmationController",
                    controllerAs: 'model'
                })
                .when("/productdisplay/:productId", {
                    templateUrl: "views/users/productdisplay.html",
                    controller: "ProductDisplayController",
                    controllerAs: 'model',
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "home"
                });
        })

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/portal/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

})();