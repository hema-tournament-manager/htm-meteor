angular.module('htm.check-in', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap'
]);

angular.module('htm.check-in').config(
  ['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider
    .state('check-in', {
      url: '/check-in',
      views: {
        '': {
          templateUrl: 'client/check-in/check-in.ng.html'
        },
        'navigation': {
          template: ''
        }
      }
      
    });
}]);