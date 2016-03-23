/**
 * Created by Josceyn on 2/26/2016.
 */

(function(){
   angular
       .module("FormBuilderApp")
       .controller("LoginController", LoginController)


    function LoginController(UserService, $location, $rootScope){
        var self=this;

        self.login=login;

        function login(user){

            if(!user) {
                return;
            }


            UserService
                .login({username:user.username,
                        password: user.password})
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }else{
                        self.message = "No such user"
                    }
                });
        }
    }


})();
