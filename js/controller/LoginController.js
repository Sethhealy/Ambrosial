//I'm calling my Login controller but I'm also using this as a signup feature as well.
app.controller("LoginController",['$scope','$rootScope','$location','$firebaseAuth','$firebase',function($scope,$rootScope,$location,$firebaseAuth,$firebase){

    // url is created here to shorten my call to firebase faster and easier.
    var url = "https://caterme.firebaseio.com/";



    // I'm calling my data as an array to be used.

    $scope.tasklist=$firebase(new Firebase(url)).$asArray();
    $scope.authObj = $firebaseAuth(new Firebase(url));

    // loginSubmit will run the login function on click from the html.
    $scope.loginSubmit = function(){
        // I'm calling my login function where authObj will authentic a users info to make sure it is correctly in the database.
            $scope.authObj.$authWithPassword($scope.user).then(function(authData){
                $rootScope.authData = authData;
                console.log("Logged in as:", authData.uid);
                $location.path('/home');
            }).catch(function(error){
                $scope.error = error;
                // console logged the error to find out what the error message was.
                // console.log(error);
                $scope.user.pass = "";
            })
    // login ends
    }

    // signup starts


    // Here I'm calling the submit function to run on click.
    $scope.signupSubmit = function(){

        // Here I'm calling the signup function to create a user in the firebase and then authenticate the user.
        $scope.authObj.$createUser($scope.user).then(function(userData) {
          return $scope.authObj.$authWithPassword($scope.user);
        }).then(function(authData) {
             // Here I'm calling userRef so that firebase will have users in the database.
        var userRef = new Firebase(url+"users/"+authData.uid);
        $scope.syncUser = $firebase(userRef);
        $scope.newUser = $scope.syncUser.$asObject();
          console.log("Signed up as:", authData.uid);
          $scope.syncUser.$set({
                    uid: authData.uid,
                    firstname: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    usertype: "employee"}
            );
          // If everyone was correct the user will be created and the Admin will be placed on the home page.
          $location.path('/login');
        }).catch(function(error) {
            $scope.error = error;
            // console logged the error to find out what the error message was.
            // console.error("Error: ", error);
        });
        // signup ends
        }
}])
