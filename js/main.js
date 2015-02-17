var app = angular.module('myApp', []);

angular.module('myApp.services', [])
  .factory('githubService', ['$http', function($http) {
    var githubUsername;
    var doRequest = function(path) {
      return $http({
        method: 'JSONP',
        url: 'https://api.github.com/users/' + githubUsername + '/' + path + '?callback=JSON_CALLBACK'
      });
    }
    return {
      events: function() { return doRequest('events'); },
      setUsername: function(newUsername) { githubUsername = newUsername; }
    };
  }]);

app.controller('PlayerController', ['$scope', function($scope) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = './media/r2d2.mp3';
  $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });
}]); 

app.controller('RelatedController', ['$scope', function($scope) {
  
}]);



// example code:
app.controller('MyController', function($scope) {
  $scope.person = { name: 'mach1010'};
  var updateClock = function() {
    $scope.clock = new Date();
  };
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});

app.controller('DemoController', function($scope) {
  $scope.counter = 0;
  $scope.add = function(amount) { $scope.counter += amount; };
  $scope.subtract = function(amount) { $scope.counter -= amount; };
});

app.controller('DemoHTTP', function($scope, $http) {
  $http({
    method: 'JSONP',
    url: 'https://api.github.com/events?callback=JSON_CALLBACK'
  }).success(function(data, status, headers, config) {
    // data contains the response
    // status is the HTTP status
    // headers is the header getter function
    // config is the object that was used to create the HTTP request
    $scope.data = data
  }).error(function(data, status, headers, config) {
  });
})

app.controller('DemoRepeat', function($scope) {
  $scope.favs = {
    'Chewie': 'Kaashik',
    'Luke': 'Tatooine',
    'Leia': 'Alderaan',
    'Yoda': 'Dagobah System'
  };
});

app.controller('ServiceController', ['$scope', '$timeout', 'githubService',
  function($scope, $timeout, githubService) {
    // The same example as above, plus the $timeout service
    var timeout;
    $scope.$watch('username', function(newVal) {
      if (newVal) {
        if (timeout) $timeout.cancel(timeout);
        timeout = $timeout(function() {
          githubService.events(newVal)
          .success(function(data, status) {
            $scope.events = data.data;
          });
        }, 350);
      }
    });
  }]);