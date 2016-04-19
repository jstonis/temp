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
                    UserService.setCurrentUser(response.data[0]);
                        $location.url("/profile");
                },function(err){
                    vm.message = "No such user"
                });
        }
    }


})();
