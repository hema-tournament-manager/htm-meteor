angular.module('htm.administration')
  .controller('CountsCtrl', function CountsCtrl($scope, $meteor) {
    $scope.counts = {};
    $scope.$meteorSubscribe('counts');
    $scope.$meteorAutorun(function() {
      $scope.counts.participants = Counts.get('participants-count');
      $scope.counts.tournaments = Counts.get('tournaments-count');
    });
});