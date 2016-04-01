/**
 * Created by Josceyn on 2/26/2016.
 */

(function(){
   angular
       .module("FormBuilderApp")
       .controller("LoginController", LoginController)


    function LoginController(UserService, $location){
           var vm=this;
        vm.login=login;

        function login(user){
            if(!user) {
                return;
            }


            UserService
                .login({username:user.username,
                        password: user.password})
                .then(function(response){
                    //console.log(user.username);
                    if(response.data){
                        UserService.setCurrentUser(response.data[0]);
                        $location.url("/profile");
                    }else{
                        vm.message = "No such user"
                    }
                });
          /*  var callback=null;
            var user=UserService.findUserByCredentials(user.username,user.password,callback);

            if(user){
                $rootScope.currentUser=user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
            else{
                $scope.message = "Incorrect user details. Try again!";
            }*/
        }
    }


})();
