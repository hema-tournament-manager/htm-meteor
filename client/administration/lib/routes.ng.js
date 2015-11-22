var phaseTemplate = function(view) {
  return function($stateParams) {
    var template = 'client/administration/' + view + '-' + $stateParams.phaseType + '.ng.html';
    console.log(template);
    return template;
  }
};

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
        tournamentId: function() { return false; },
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
      resolve: {
        tournamentId: function($stateParams) {
          return $stateParams.tournamentId;
        }
      }
    })
    .state('administration.tournaments.view.phase', {
      url: '/:phaseIndex/:phaseType',
      templateUrl: 'client/administration/tournaments-view-phase.ng.html',
      controllerProvider: function($stateParams) {
        return $stateParams.phaseType.charAt(0).toUpperCase() + $stateParams.phaseType.substring(1) + 'PhaseCtrl';
      },
      controllerAs: 'phase',
      resolve: {
        phaseIndex: function($stateParams) {
          return +$stateParams.phaseIndex;
        }
      }
    })
    .state('administration.tournaments.view.phase.fights', {
      url: '/fights',
      templateUrl: phaseTemplate('fights'),
      controller: 'FightsCtrl',
      controllerAs: 'fights'
    })
    .state('administration.tournaments.view.phase.participants', {
      url: '/participants',
      templateUrl: phaseTemplate('participants')
    })
    .state('administration.tournaments.view.phase.settings', {
      url: '/settings',
      templateUrl: phaseTemplate('settings'),
    });
});