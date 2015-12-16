HtmApp = angular.module('htm.app', [
  'angular-meteor',
  'ui.router',
  'ct.ui.router.extras.dsr',

  'htm.core',
  'htm.check-in',
  'htm.battle-station',
  'htm.administration',
  'htm.viewers',
]);

HtmApp.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/home.ng.html'
    });

  $urlRouterProvider.otherwise('/');
});