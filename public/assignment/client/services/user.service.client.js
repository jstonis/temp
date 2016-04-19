/**
 * Created by Joscelyn on 2/27/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($rootScope, $http) {

        var api={
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            login: login,
            register: register,
            logout: logout,
            getProfile: getProfile,
            setCurrentUser: setCurrentUser
        };
        return api;


        function getProfile(){
            return $http.get("/api/assignment/profile/"+$rootScope.currentUser._id);
        }

        function register(user){
            return $http.post("/api/assignment/register",user);
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function login(credentials) {
            return $http.post("/api/assignment/login", credentials);
        }

        function findUserByUsername (username) {
            return $http({
                url: "/api/assignment/user",
                method: "GET",
                params: {username: username}
            });
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/"+user, user)
        }




        /*
         * ADMIN ROUTES
         */

        function createUser (user) {            
            return $http.post("/api/assignment/admin/user",user);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user"+userId);
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/"+ userId);
        }

        function updateUser (userId, user) {
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }
        //End admin routes

    }
})();