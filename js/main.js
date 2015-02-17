var app = angular.module('myApp', []);
var apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';


app.controller('PlayerController', ['$scope','$http', function($scope, $http) {
  var audio = document.createElement('audio');
  $scope.audio = audio

  $scope.play = function(program) {
    if ($scope.playing) $scope.audio.pause();
    var url = program.audio[0].format.mp4.$text;
    audio.src = url;
    audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop();
    });
  });
  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.programs = data.list.story;
  }).error(function(data, status) {
  });
}]); 

app.controller('RelatedController', ['$scope', function($scope) {
  
}]);