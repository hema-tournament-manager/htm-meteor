angular.module('htm.administration')
.config(function($stateProvider) {
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
      },
      dsr: true,
      resolve: {
        subscribe: function($meteor) {
          return $meteor.subscribe('tournaments', {fields: {name: 1, identifier: 1}});
        }
      }
    })

    .state('administration.participants.import', {
      url: '/import',
      templateUrl: 'client/administration/participants-import.ng.html',
      controller: 'ParticipantsImportCtrl',
      controllerAs: 'importer',
    })

    .state('administration.participants.add', {
      url: '/add',
      templateUrl: 'client/administration/participants-edit.ng.html',
      controller: 'ParticipantEditCtrl',
      controllerAs: 'editor',
    })
    .state('administration.participants.edit', {
      url: '/edit/:participantId',
      views: {
       'edit': {
          templateUrl: 'client/administration/participants-edit.ng.html',
          controller: 'ParticipantEditCtrl',
          controllerAs: 'editor',
        }
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
      abstract: true,
      template: '<ui-view></ui-view>',
      controller: 'TournamentsCtrl',
      controllerAs: 'tournaments',
      resolve: {
        subscribe: function($meteor) {
          return $meteor.subscribe('tournaments');
        }
      }
    })
    .state('administration.tournaments.dashboard', {
      url: '',
      templateUrl: 'client/administration/tournaments-dashboard.ng.html'
    })
    .state('administration.tournaments.view', {
      url: '/:tournamentId',
      templateUrl: 'client/administration/tournaments-view.ng.html',
      controller: 'TournamentViewCtrl',
      controllerAs: 'tournament',
      dsr: true,
      resolve: {
        subscribe: function($meteor) {
          return $meteor.subscribe('participants');
        }
      }
    })
    .state('administration.tournaments.view.phase', {
      url: '/:phaseIndex',
      templateUrl: 'client/administration/tournaments-view-phase.ng.html',
      controller: 'TournamentViewPhaseCtrl',
      controllerAs: 'phase'
    });
});