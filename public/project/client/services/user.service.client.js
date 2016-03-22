/**
 * Created by Joscelyn on 2/27/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var currentUsers = [];
        currentUsers = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            getFollowersByUserId: getFollowersByUserId,
            getUsersNameById: getUsersNameById,
            addToCart: addToCart,
            findUserById: findUserById,
            getArrayOfUsersByIds: getArrayOfUsersByIds,
            addLikedProduct: addLikedProduct
        };
        return currentUsers;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findUserById(id) {
            for (var u in currentUsers.users) {
                if (currentUsers.users[u]._id == id) {
                    return currentUsers.users[u];
                }
            }
            return null;
        }

        function createUser(user, callback) {
            var user = {
                _id: (new Date).getTime(), username: user.username, password: user.password
            };
            currentUsers.users.push(user);
            callback = user;
            return callback;
        }

        function findUserByUsername(username) {
            for (var u in currentUsers.users) {
                if (currentUsers.users[u].username === username) {
                    return currentUsers.users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            return $http.post('/api/project/')
            for (var u in currentUsers.users) {
                //  console.log(currentUsers.users[u].username);
                if (currentUsers.users[u].username === username &&
                    currentUsers.users[u].password === password) {
                    callback = currentUsers.users[u];
                    return callback;
                }
            }
            return null;
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

        function findAllUsers(callback) {
            callback = currentUsers.users;
            return callback;

        }

        function deleteUserById(userId, callback) {
            for (var u in currentUsers.users) {
                if (currentUsers.users[u]._id === userId) {
                    currentUsers.users[u].remove();
                    callback = currentUsers.users;
                    return callback;
                }
            }
            return null;
        }

        function getFollowersByUserId(userId) {
            for (var u in currentUsers.users) {
                if (currentUsers.users[u]._id === userId) {
                    return currentUsers.users[u].following;
                }
            }
            return null;

        }

        function getUsersNameById(userId) {
            for (var u in currentUsers.users) {
                if (currentUsers.users[u]._id === userId) {
                    return currentUsers.users[u].firstName + " " + currentUsers.users[u].lastName;
                }
            }
            return null;
        }

        function addToCart(accessory) {
            if ($rootScope.currentUser != null) {
                $rootScope.currentUser.cartItems.push(accessory);
            }

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
            $rootScope.currentUser.likedProducts.push(product);
        }
    }
})();