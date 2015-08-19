angular.module('htm.viewers', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap'
]);

angular.module('htm.viewers').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('viewers', {
      url: '/viewers',
      views: {
        '': {
          templateUrl: 'client/viewers/viewers.ng.html'
        },
        'navigation': {
          templateUrl: 'client/viewers/navigation.ng.html'
        }
      }
      
    });
}]);