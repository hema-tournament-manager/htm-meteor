angular.module('htm.check-in').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider
    .state('check-in', {
      url: '/check-in',
      views: {
        '': {
          templateUrl: 'client/check-in/views/list.ng.html'
        },
        'navigation': {
          template: ' <li><a href="event" data-toggle="collapse" data-target=".navbar-collapse">Event</a></li>'
        }
      }
      
    });
});