angular.module('htm.app', [
  'angular-meteor',
  'ui.router',
  'htm.core',
  'htm.check-in',
  'htm.battle-station'
]);

angular.module('htm.app').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'client/home.ng.html'
    });

  $urlRouterProvider.otherwise('/home');
});