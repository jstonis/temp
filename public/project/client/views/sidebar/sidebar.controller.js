/**
 * Created by Josceyn on 2/26/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);


    function SidebarController($scope, $location, $rootScope, UserService){
        $scope.$location = $location;
        $scope.isAdmin=isAdmin;
        $scope.isLoggedIn=isLoggedIn;
        $scope.isLoggedOut=isLoggedOut;

        function isAdmin(){
            if($rootScope.currentUser){
                for (var u in $rootScope.currentUser.roles) {
                    console.log($rootScope.currentUser.roles[u]);
                    if ($rootScope.currentUser.roles[u] === "admin") {
                        return true;
                    }
                }
            }
            return false;
        }
        function isLoggedIn(){
            if($rootScope.currentUser){
                return true;
            }
            else{return false;}
        }
        function isLoggedOut(){
            if($rootScope.currentUser){
                return false;
            }
            else{return true;}
        }


    }
})();