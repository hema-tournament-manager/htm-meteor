angular.module('htm.administration', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap'
]);

angular.module('htm.administration').config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('administration', {
      abstract: true,
      url: '/administration',
      views: {
        '': {
            template: '<ui-view/>'
        },
        'navigation': {
          templateUrl: 'client/administration/navigation.ng.html'
        }
      }
    })
    .state('administration.participants', {
      url: '/participants',
      views: {
        '': {
          templateUrl: 'client/administration/participants.ng.html'
        },
        'navigation': {
          templateUrl: 'client/administration/navigation.ng.html'
        }
      }
    })
    .state('administration.event', {
      url: '/event',
      views: {
        '': {
          templateUrl: 'client/administration/event.ng.html'
        },
        'navigation': {
          templateUrl: 'client/administration/navigation.ng.html'
        }
      }
    })
    .state('administration.schedule', {
      url: '/schedule',
      views: {
        '': {
          templateUrl: 'client/administration/schedule.ng.html'
        },
        'navigation': {
          templateUrl: 'client/administration/navigation.ng.html'
        }
      }
    })
    .state('administration.tournaments', {
      url: '/tournaments',
      views: {
        '': {
          templateUrl: 'client/administration/tournaments.ng.html'
        },
        'navigation': {
          templateUrl: 'client/administration/navigation.ng.html'
        }
      }
    })
    ;


}]);