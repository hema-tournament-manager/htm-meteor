HtmBattleStation.config(function($stateProvider) {
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
			resolve: {
				subscribeArenas: function(waitForSubscription) { 
					return waitForSubscription('arenas');
				},
				subscribeTournaments: function(waitForSubscription) { 
					return waitForSubscription('tournaments');
				},
				subscribeParticipants: function(waitForSubscription) { 
					return waitForSubscription('participants');
				}
			}
		})    
		.state('battle-station.arena', {
			url: '/:arenaId',
			views: {
				'': {
					templateUrl: 'client/battle-station/select-fight.ng.html',
				},
				'scheduled-fights@battle-station.arena': {
					templateUrl: 'client/battle-station/scheduled-fights.ng.html',
					controller: 'ScheduledFightsCtrl',
					controllerAs: 'scheduledFights'
				}	

			}
		})
		.state('battle-station.fight', {
			url: '/:arenaId/:tournamentId/fight/:fightId',
			views: {
				'': {
					templateUrl: 'client/battle-station/score-board.ng.html',
					controller: 'ScoreBoardCtrl',
					controllerAs: 'scoreBoard'
				},
				'scheduled-fights@battle-station.fight': {
					templateUrl: 'client/battle-station/scheduled-fights.ng.html',
					controller: 'ScheduledFightsCtrl',
					controllerAs: 'scheduledFights'
				}	
			}
		})

		;
});