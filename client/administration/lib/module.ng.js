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
          templateUrl: 'client/administration/navigation.ng.html',
          controller: 'CountsCtrl'
        }
      }
    })

    .state('administration.participants', {
      url: '/participants',
      views: {
        '': {
          templateUrl: 'client/administration/participants.ng.html',
          controller: 'ParticipantsCtrl',
          controllerAs: 'participants'
        }
      }
    })

    .state('administration.participants.import', {
      url: '/import',
      templateUrl: 'client/administration/participants-import.ng.html',
      controller: 'ParticipantsImportCtrl',
      controllerAs: 'importer',
      data : {
        returnState: 'administration.participants'
      }
    })

    .state('administration.participants.add', {
      url: '/add',
      templateUrl: 'client/administration/participants-add.ng.html',
      controller: 'ParticipantEditCtrl',
      controllerAs: 'participant',
      data : {
        returnState: 'administration.participants'
      }
       
    })

    .state('administration.event', {
      url: '/event',
      views: {
        '': {
          templateUrl: 'client/administration/event.ng.html'
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
        }
      }
    })
    ;


}]);