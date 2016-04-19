/**
 * Created by Josceyn on 2/26/2016.
 */
 (function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", FormController)

    function FormController($scope,UserService){


        //Set default sorting
        $scope.sortVal = 'username';
        $scope.reverse = false;


    	function loadUsers(){
    		UserService
    			.findAllUsers()
    			.then(function(response){
    				$scope.users = response.data;
    			},function(){
    				$scope.error = "Error getting users";
    			})
    	}

    	loadUsers();

    	$scope.createNewUser = function(newUser){
            if(!newUser){
                $scope.error = "fill in the details"
                return;
            }

    		if(!newUser.username){
    			$scope.error = "Username is required"
    			return
    		}

    		if(!newUser.password){
    			$scope.error = "Password is required"
    			return
    		}

    		if(!newUser.roles){
    			$scope.error = "Role is required"
    			return
    		}

            if(typeof(newUser.roles) == 'string'){
                newUser.roles = newUser.roles.split(',');
            }

    		UserService
    			.createUser(newUser)
    			.then(function(response){
                    if(response.data.error){
                        $scope.error = response.data.message;
                        return;
                    }
    				loadUsers();
    			},function(err){
    				$scope.error="Error creating user`"
    			})
    	}

    	$scope.updateUser = function(newUser){

            if(!newUser){
                $scope.error = "fill in the details"
                return;
            }

            if(!newUser.username){
                $scope.error = "Username is required"
                return
            }

            if(!newUser.password){
                $scope.error = "Password is required"
                return
            }

            if(!newUser.firstName){
                $scope.error = "FirstName is required"
                return
            }

            if(!newUser.lastName){
                $scope.error = "LastName is required"
                return
            }

            if(!newUser.roles){
                $scope.error = "Role is required"
                return
            }

            if(typeof(newUser.roles) == 'string'){
                newUser.roles = newUser.roles.split(',');
            }

    		UserService
    			.updateUser(newUser._id,newUser)
    			.then(function(){
    				loadUsers();
    			},function(){
    				$scope.error ="Error updating user"
    			})
    	}

        $scope.deleteUser = function(user){
            UserService
                .deleteUserById(user._id)
                .then(function(){
                    loadUsers();
                },function(){ 
                    $scope.error ="Error deleting user"
                })
        }

        $scope.setCurrentUser = function(user){
            $scope.newUser = {};
            $scope.newUser.username = user.username;
            $scope.newUser.roles = user.roles;
            $scope.newUser.firstName = user.firstName;
            $scope.newUser.lastName = user.lastName;
            $scope.newUser._id = user._id;
        }

        $scope.toggleSort = function(sortVal){
            $scope.sortVal = sortVal;
            $scope.reverse = !$scope.reverse;
        }
    }
})();