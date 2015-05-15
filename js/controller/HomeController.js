//I'm calling my Home controller.
app.controller("HomeController",['$scope','$rootScope','$location','$firebaseAuth','$firebase',function($scope,$rootScope,$location,$firebaseAuth,$firebase){
    //url is named to shorten and make my process of calling my firebase easier.
    var url = "https://caterme.firebaseio.com/";
    // Calling ref here as url + tasks so that firebase will make a new place for all my tasks.
    var ref = new Firebase(url+"tasks");
    // Here I'm using sync as the new call for everything involving my tasks.
    var sync = $firebase(ref);

    // scope is allowing my data to be called as an array so I can pull from it.
    $scope.tasklist=sync.$asArray();

    $scope.tasklist.$loaded()
        .then(function(data){
            data == $scope.tasklist;
        })
        .catch(function(error){
            console.log("error", error);
        });


    var locationref = new Firebase(url+"locations/");
    var locationsync = $firebase(locationref);
        $scope.taskLocation = locationsync.$asObject();

        $scope.taskLocation.$loaded()
        .then(function(data){
            data == $scope.taskLocation;
        })
        .catch(function(error){
            console.log("error", error);
        });
    // console.log($scope.tasklist);
    // I'm consoling my data to make sure it is working.
    // console.log("my data: ", $scope.tasklist);
    var time = new Date();


    $scope.addEmployee = function (){
        sync.$push($scope.employee);
        $scope.employee = {};
    };


    // Here I'm making a function allowing the admin to create new tasks.
    $scope.addTask = function (tasklist){
      var taskref = new Firebase(url+"tasks/"+$scope.sections);
      var tasksync = $firebase(taskref);
        $scope.task.time = {};
        $scope.task.time.start = new Date().valueOf();
        console.log($scope.task.name);
        tasksync.$push($scope.task);
        $scope.task = {};
    };



    $scope.addLocation = function (task){


        $scope.taskLocation.location = $scope.task.location;
        $scope.taskLocation.$save();
        console.log("data yo", task.location);
        // locationsync.$push($scope.task);
        // $scope.task = {};

    };

    // Here I'm making a function to update the status of the tasks so that other users can see what is being worked on.
    $scope.update = function(tasklist){
        // console.log("This", tasklist)
        tasklist.time.taken = new Date().valueOf();
        tasklist.status = "Taken";
        console.log("This", tasklist);
        $scope.tasklist.$save(tasklist);
    }

    $scope.stop = function(tasklist){
        // console.log("This", tasklist)
        tasklist.status = "Untaken";
        tasklist.time.taken = "";
        $scope.tasklist.$save(tasklist);
    }

    $scope.complete = function(tasklist){
        tasklist.time.complete = new Date().valueOf();
        tasklist.status = "Complete";
        $scope.tasklist.$save(tasklist);
    }


    // I'm setting up authorization so the user can be called and displayed.
    $scope.authObj = $firebaseAuth(ref);
    $scope.authObj.$onAuth(function(authData){
        if(authData){
            var userRef = new Firebase(url+"users/"+authData.uid);
            var sync = $firebase(userRef);
            $scope.user = sync.$asObject();
            $scope.user.$loaded().then(function(data){

                var currentTime = new Date().valueOf();
                var endTime = parseInt(data.createdtime) + (1000*60*60*24);
                // console.log("Current:", currentTime, "End:", endTime);
                // console.log("created", data.createdtime);

                if(currentTime >= endTime){
                    $scope.authObj.$removeUser({
                      email: data.email,
                      password: "password"
                    }).then(function() {
                      console.log("User removed successfully!");
                    }).catch(function(error) {
                      console.error("Error: ", error);
                    });
                }else{
                }
            }).catch(function(error){
                console.log("Error", error);
            });
        }else{
            $location.path('/')
        }

    })



    // Here I'm using selected as a choice for the drop down for status to default to none.
    $scope.selected = true;
    $scope.none = true;

  // This is my accordian where i can drop down the clients and hide the ones I'm not looking at.
  $scope.oneAtATime = true;
  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1',
      no: 1
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2',
      no: 1
    }
  ];

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}]);
