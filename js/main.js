var app = angular.module('myApp', []);

app.run(function($rootScope) {
  $rootScope.name = 'MACH1010';
});

app.controller('MyController', function($scope) {
  $scope.person = {
    name: 'mach1010'
  };
});

app.controller('ParentController', function($scope) {
  $scope.person = {
    greeted: false
  };
});

app.controller('ChildController', function($scope) {
  $scope.sayHello = function() {
    $scope.person.greeted = true;
  };
});