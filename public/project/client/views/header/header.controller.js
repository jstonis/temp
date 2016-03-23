(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);


    function HeaderController($scope, $location, $rootScope, UserService){
        $scope.$location = $location;
        $scope.isAdmin=isAdmin;
        $scope.isLoggedIn=isLoggedIn;
        $scope.logout=logout;
        $scope.currentNotHome=currentNotHome;

        function isAdmin(){
            if($rootScope.currentUser){
                for (var u in $rootScope.currentUser.roles) {
                    if ($rootScope.currentUser.roles[u] === "admin") {
                        return true;
                    }
                }
            }
            return false;
        }
        //Check if user is logged in
        function isLoggedIn(){
            if($rootScope.currentUser){
                $scope.user=$rootScope.currentUser;
                return true;
            }
            else{
                return false;
            }
        }

        function logout(){
            UserService
                .logout()
                .then(function(res){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                },function(err){
                    $scope.message ="error"
                });
        }

        function currentNotHome(){
            if($location.path()!="/home"){
                return true;
            }
            else{
                return false;
            }
        }

    }
})();