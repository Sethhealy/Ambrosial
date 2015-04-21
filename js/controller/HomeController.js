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

    // I'm consoling my data to make sure it is working.
    // console.log("my data: ", $scope.tasklist);

    $scope.addEmployee = function (){
        sync.$push($scope.employee);
        $scope.employee = {};
    };

    // Here I'm making a function allowing the admin to create new tasks.
    $scope.addTask = function (){
      console.log("do you know me?",$scope.sections)
      var taskref = new Firebase(url+"tasks/"+$scope.sections);
      var tasksync = $firebase(taskref);
        //console.log($scope.task);
        tasksync.$push($scope.task);
        $scope.task = {};
    };

    // Here I'm making a function to update the status of the tasks so that other users can see what is being worked on.
    $scope.update = function(tasklist){
        // console.log("This", tasklist)
        tasklist.status = "Taken";
        $scope.tasklist.$save(tasklist);
    }

    $scope.complete = function(tasklist){
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
            // console.log($scope.user);
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
