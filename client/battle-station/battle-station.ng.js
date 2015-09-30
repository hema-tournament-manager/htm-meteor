angular.module('htm.battle-station')
	.controller('BattleStationCtrl', function($scope, $meteor, $state, $stateParams) {
		var self = this;

		self.hitGroups = [
			[{
				name: 'Clean Hit',
				side: 'red',
				scoreType: 'single'
			},{
				name: 'Received After blow',
				side: 'blue',
				scoreType: 'double'
			}],[{
				name: 'Double Hit',
				side: undefined,
				scoreType: 'double'
			},{
				name: 'No Hit',
				side: undefined,
				scoreType: 'none'
			}],[{
				name: 'Clean Hit',
				side: 'blue',
				scoreType: 'single'
			},{
				name: 'Received After blow',
				side: 'red',
				scoreType: 'after'
			}]
		];

});
