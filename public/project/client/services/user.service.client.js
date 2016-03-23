    /**
 * Created by Joscelyn on 2/27/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope,$http) {
        var currentUsers = [];
        currentUsers = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            login: login,
            logout: logout,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            getFollowersByUserId: getFollowersByUserId,
            getUsersNameById: getUsersNameById,
            addToCart: addToCart,
            removeFromCart : removeFromCart,
            findUserById: findUserById,
            getArrayOfUsersByIds: getArrayOfUsersByIds,
            addLikedProduct: addLikedProduct
        };
        return currentUsers;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/user/loggedin");
        }

        function findUserById(userId) {
            return $http.get("/api/project/userid/"+userId);
        }

        function createUser (user) {

            return $http.post("/api/project/user",user);
        }

        function findUserByUsername(username) {
            return $http({
                url: "/api/project/user",
                method: "GET",
                params: {username: username}
            });
        }

        function login(creds) {
            return $http.post('/api/project/user/login',creds);
        }

        function logout(){
            return $http.get('/api/project/user/logout')
        }

        function updateUser(userId, user, callback) {
            for (var u in currentUsers.users) {
                if (currentUsers.users[u]._id === userId) {
                    console.log("on the right track");
                    currentUsers.users[u] = user;
                    callback = currentUsers.users[u];
                    return callback;
                }
            }
            return null;

        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/"+userId);
        }

        function getFollowersByUserId(userId) {
            return $http.get("/api/project/user/followers/"+userId);
        }

        function getUsersNameById(userId) {
            for (var u in currentUsers.users) {
                if (currentUsers.users[u]._id === userId) {
                    return currentUsers.users[u].firstName + " " + currentUsers.users[u].lastName;
                }
            }
            return null;
        }

        function addToCart(product) {
            return $http.post("/api/project/user/cart/add",product);
        }

        function removeFromCart(productId){
            var data = {productId:productId};
            return $http.post("/api/project/user/cart/remove",data);
        }

        function getArrayOfUsersByIds(ids) {
            var userArray = [];

            for (var u in ids) {
                for (var v in currentUsers.users)
                    if (currentUsers.users[v]._id === ids[u]) {
                        userArray.push(currentUsers.users[v]);
                        break;
                    }
            }
            return userArray;


        }

        function addLikedProduct(product) {
            //$rootScope.currentUser.likedProducts.push(product);
        }
    }
})();