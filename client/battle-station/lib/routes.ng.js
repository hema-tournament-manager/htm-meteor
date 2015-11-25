angular.module('htm.battle-station').config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('battle-station', {
			abstract: true,
			url: '/battle-station',
			views: {
				'': {
					template: '<ui-view/>'
				},
				'navigation': {
					templateUrl: 'client/battle-station/navigation.ng.html',
					controller: 'ArenasCtrl',
					controllerAs: 'arenas'
				}			
			},
			dsr: true,
			resolve: {
				subscribeArenas: function($meteor,$stateParams) { 
					return $meteor.subscribe('arenas');
				},
				subscribeTournaments: function($meteor,$stateParams) { 
					return $meteor.subscribe('tournaments');
				},
				subscribeParticipants: function($meteor,$stateParams) { 
					return $meteor.subscribe('participants');
				}				
			}
		})    
		.state('battle-station.arena', {
			url: '/:arenaId',
			views: {
				'': {
					templateUrl: 'client/battle-station/battle-station-tutorial.ng.html',
				},
				'scheduled-fights@battle-station.arena': {
					templateUrl: 'client/battle-station/battle-station-scheduled-fights.ng.html',
					controller: 'ScheduledFightsCtrl',
					controllerAs: 'scheduledFights'
				}	

			}
		})
		.state('battle-station.fight', {
			url: '/:arenaId/:tournamentId/fight/:fightId',
			views: {
				'': {
					templateUrl: 'client/battle-station/battle-station.ng.html',
					controller: 'BattleStationCtrl',
					controllerAs: 'battleStation'
				},
				'scheduled-fights@battle-station.fight': {
					templateUrl: 'client/battle-station/battle-station-scheduled-fights.ng.html',
					controller: 'ScheduledFightsCtrl',
					controllerAs: 'scheduledFights'
				}	
			}
		})

		;
}]);