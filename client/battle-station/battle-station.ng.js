angular.module('htm.battle-station')
	.controller('BattleStationCtrl', function($scope, $meteor, $state, $stateParams) {
		var self = this;

		self.exchanges  = [];

		self.selectedHit = undefined;

		self.scoreTypes = {
			'single' : {points: [1,2,3], name:'Clean Hit'}, 
			'double' : {points: [1], name:'Double Hit'},
			'after'  : {points: [1], name:'After Blow'},
			'none'   : {points: [0], name:'No Hit'}
		};

		self.hitGroups = [
			[{
				side: 'red',
				scoreType: 'single'
			},{
				side: 'red',
				scoreType: 'after'
			}],[{
				side: undefined,
				scoreType: 'double'
			},{
				side: undefined,
				scoreType: 'none'
			}],[{
				side: 'blue',
				scoreType: 'single'
			},{
				side: 'blue',
				scoreType: 'after'
			}]
		];

		self.hitName = function(hit){
			return self.scoreTypes[hit.scoreType].name;
		}

		self.isHitSelected = function(hit){
			return self.selectedHit === hit;
		}

		self.selectHit = function(hit){
			self.selectedHit = undefined;

			var scoreType = self.scoreTypes[hit.scoreType];
			if(scoreType.points.length === 1){
				self.exchanges.push({side: hit.side, type:hit.scoreType, points: scoreType.points[0]});
				return;
			}

			self.selectedHit = hit;
		}

		self.cancelHit = function(){
			self.selectedHit = undefined;
		}

		self.selectPoints = function(points){
			self.exchanges.push({side: self.selectedHit.side, type:self.selectedHit.scoreType, points: points});
			self.selectedHit = undefined;
		}

		self.hitPoints = function(hit){
			return self.scoreTypes[hit.scoreType].points;
		}

});
