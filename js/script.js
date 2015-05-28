var app=angular.module("Ambrosial",["ngRoute","xeditable","ui.bootstrap","firebase"]);app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"Views/login.html",controller:"LoginController"}).when("/home",{templateUrl:"Views/home.html",controller:"HomeController"}).when("/signup",{templateUrl:"Views/signup.html",controller:"LoginController"}).when("/form",{templateUrl:"Views/form.html",controller:"HomeController"}).when("/user",{templateUrl:"Views/signupuser.html",controller:"LoginController"})}]),app.run(function(editableOptions){editableOptions.theme="bs3"}),app.filter("toArray",function(){"use strict";return function(obj){return obj instanceof Object?Object.keys(obj).filter(function(key){return"$"!==key.charAt(0)?key:void 0}).map(function(key){return Object.defineProperty(obj[key],"$key",{__proto__:null,value:key})}):obj}}),app.controller("HomeController",["$scope","$rootScope","$location","$firebaseAuth","$firebase",function($scope,$rootScope,$location,$firebaseAuth,$firebase){var url="https://caterme.firebaseio.com/",ref=new Firebase(url+"tasks"),sync=$firebase(ref);$scope.tasklist=sync.$asArray(),$scope.tasklist.$loaded().then(function(data){data==$scope.tasklist})["catch"](function(error){console.log("error",error)});var locationref=new Firebase(url+"locations/"),locationsync=$firebase(locationref);$scope.taskLocation=locationsync.$asObject(),$scope.taskLocation.$loaded().then(function(data){data==$scope.taskLocation})["catch"](function(error){console.log("error",error)});new Date;$scope.addEmployee=function(){sync.$push($scope.employee),$scope.employee={}},$scope.addTask=function(tasklist){var taskref=new Firebase(url+"tasks/"+$scope.sections),tasksync=$firebase(taskref);$scope.task.time={},$scope.task.time.start=(new Date).valueOf(),console.log($scope.task.name),tasksync.$push($scope.task),$scope.task={}},$scope.addLocation=function(task){$scope.taskLocation.location=$scope.task.location,$scope.taskLocation.$save(),console.log("data yo",task.location),$scope.editlocation=!0},$scope.update=function(tasklist){tasklist.time.taken=(new Date).valueOf(),tasklist.status="Taken",console.log("This",tasklist),$scope.tasklist.$save(tasklist)},$scope.stop=function(tasklist){tasklist.status="Untaken",tasklist.time.taken="",$scope.tasklist.$save(tasklist)},$scope.complete=function(tasklist){tasklist.time.complete=(new Date).valueOf(),tasklist.status="Complete",$scope.tasklist.$save(tasklist)},$scope.authObj=$firebaseAuth(ref),$scope.authObj.$onAuth(function(authData){if(authData){var userRef=new Firebase(url+"users/"+authData.uid),sync=$firebase(userRef);$scope.user=sync.$asObject(),$scope.user.$loaded().then(function(data){var currentTime=(new Date).valueOf(),endTime=parseInt(data.createdtime)+864e5;currentTime>=endTime&&$scope.authObj.$removeUser({email:data.email,password:"password"}).then(function(){console.log("User removed successfully!")})["catch"](function(error){console.error("Error: ",error)})})["catch"](function(error){console.log("Error",error)})}else $location.path("/")}),$scope.selected=!0,$scope.none=!0,$scope.oneAtATime=!0,$scope.groups=[{title:"Dynamic Group Header - 1",content:"Dynamic Group Body - 1",no:1},{title:"Dynamic Group Header - 2",content:"Dynamic Group Body - 2",no:1}],$scope.status={isFirstOpen:!0,isFirstDisabled:!1}}]),app.controller("ModalInstanceCtrl",function($scope,$modalInstance,$rootScope,$location,$firebase,$firebaseAuth){$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.addTask=function(){var taskref=new Firebase(url+"tasks/"+$scope.sections),tasksync=$firebase(taskref);$scope.task.time={},$scope.task.time.start=(new Date).valueOf(),console.log($scope.task),tasksync.$push($scope.task),$scope.task={}},$location.path("/home"),$modalInstance.dismiss("cancel")}),app.controller("LoginController",["$scope","$rootScope","$location","$firebaseAuth","$firebase","$modal",function($scope,$rootScope,$location,$firebaseAuth,$firebase,$modal){var url="https://caterme.firebaseio.com/";$scope.tasklist=$firebase(new Firebase(url)).$asArray(),$scope.authObj=$firebaseAuth(new Firebase(url)),$scope.loginSubmit=function(){$scope.authObj.$authWithPassword($scope.user).then(function(authData){$rootScope.authData=authData,console.log("Logged in as:",authData.uid),$location.path("/home")})["catch"](function(error){$scope.error=error,$scope.user.pass=""})},$scope.signupUser=function(){$scope.authObj.$createUser($scope.user).then(function(userData){return $scope.authObj.$authWithPassword($scope.user)}).then(function(authData){var userRef=new Firebase(url+"users/"+authData.uid);$scope.syncUser=$firebase(userRef),$scope.newUser=$scope.syncUser.$asObject(),console.log("Signed up as:",authData.uid),$scope.syncUser.$set({uid:authData.uid,firstname:$scope.user.name,email:$scope.user.email,password:$scope.user.password,usertype:"user",createdtime:(new Date).valueOf()}),$location.path("/home")})["catch"](function(error){$scope.error=error})},$scope.signupSubmit=function(){$scope.authObj.$createUser($scope.user).then(function(userData){return console.log(userData),userData}).then(function(authData){var userRef=new Firebase(url+"users/"+authData.uid);$scope.syncUser=$firebase(userRef),$scope.newUser=$scope.syncUser.$asObject(),console.log("Signed up :",authData.uid),$scope.syncUser.$set({uid:authData.uid,firstname:$scope.user.name,email:$scope.user.email,password:$scope.user.password,usertype:"employee"}),$location.path("/home")})["catch"](function(error){$scope.error=error})},$scope.openForm=function(){$modal.open({templateUrl:"Views/form.html",controller:"HomeController"})}}]),app.controller("SwipeController",["$scope","$window",function($scope,$window){$scope.var1=!0,$scope["delete"]=function(){$scope.var1=!1}}]);