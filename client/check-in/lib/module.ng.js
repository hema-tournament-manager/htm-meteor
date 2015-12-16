HtmCheckIn = angular.module('htm.check-in', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap'
]);

HtmCheckIn.config(
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