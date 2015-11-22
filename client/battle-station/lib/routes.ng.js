angular.module('htm.battle-station').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('battle-station', {
      abstract: true,
      url: '/battle-station',
      views: {
        '': {
          templateUrl: 'client/battle-station/battle-station-frame.ng.html',
        },
        'navigation': {
          templateUrl: 'client/battle-station/navigation.ng.html',
          controller: 'ArenasCtrl',
          controllerAs: 'arenas'
        }
      }
    })    
    .state('battle-station.arena', {
      url: '/battle-station/arena/:arenaId',
      views: {
        '': {
          templateUrl: 'client/battle-station/battle-station-tutorial.ng.html',
        },
        'scheduled-fights': {
            templateUrl: 'client/battle-station/battle-station-scheduled-fights.ng.html',
            controller: 'ScheduledFightsCtrl',
            controllerAs: 'scheduledFights'
        }
      }
    })
    .state('battle-station.fight', {
      url: '/battle-station/arena/:arenaId/tournament/:tournamentId/fight/:fightId',
      views: {
        '': {
          templateUrl: 'client/battle-station/battle-station.ng.html',
          controller: 'BattleStationCtrl',
          controllerAs: 'battleStation'
        },
        'scheduled-fights': {
            templateUrl: 'client/battle-station/battle-station-scheduled-fights.ng.html',
            controller: 'ScheduledFightsCtrl',
            controllerAs: 'scheduledFights'
        }
      }
    })

    ;
}]);