angular.module('htm.battle-station')
	.controller('BattleStationCtrl', function($scope, $meteor, $state, $stateParams) {
		var self = this;

		self.hitGroups = [
			[{
				name: 'Clean Hit',
				side: 'red',
				scoreType: 'single'
			},{
				name: 'Clean Hit',
				side: 'blue',
				scoreType: 'single'
			}],
			[{
				name: 'Double Hit',
				side: undefined,
				scoreType: 'double'
			}],
			[{
				name: 'Received After blow',
				side: 'red',
				scoreType: 'after'
			},{
				name: 'Received After blow',
				side: 'blue',
				scoreType: 'double'
			}]
		];

});
