/**
 * Created by Josceyn on 2/26/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location,$rootScope, UserService) {
            $scope.message=null;
            $scope.register=register;

        function register(user){
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            var user = UserService.findUserByUsername(user.username)
                .then(function(response){
                    if(response.data.username){
                        $scope.message = "User already exists";
                        return;   
                    }

                    UserService.register($scope.user)
                        .then(function(response){
                            if(response.data.error){
                                alert(response.data.message||"error")
                                return
                            }
                             UserService.setCurrentUser(response.data);
                             $location.url("/profile");
                        },function(err){
                            $scope.message = "Error creating user"        
                        });

                },function(err){
                    $scope.message = "Cannot connect to db"
                });

            }

    }
})();