angular.module('htm.battle-station')
	.controller('BattleStationCtrl', function($scope, $meteor, $state, $stateParams) {
		var self = this;

		self.tournament = {name:'Authentic Grass Swords'};
		self.arena = {name:'Arena 1'};

		self.fighterA = {name:'Finn'};
		self.fighterB = {name:'Jake'};

		var exchanges  = [];
		var redoQueue = [];
		var selectedHit = undefined;

		var scoreTypes = {
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

		self.undo = function(){
			if(self.cantUndo()){
				return;
			}
			redoQueue.push(exchanges.pop());
		};

		self.redo = function(){
			if(self.cantRedo()){
				return;
			}

			exchanges.push(redoQueue.pop());			
		};

		self.cantRedo = function(){
			return _.isEmpty(redoQueue);
		};

		self.cantUndo = function(){
			return _.isEmpty(exchanges);
		};

		self.score = function(side){
			return _.reduce(_.where(exchanges, {side:side}), 
				function(memo, exchange){ return memo + exchange.points; }, 0)
		};

		self.exchange = function(){
			return exchanges.length;
		};

		self.hitName = function(hit){
			return scoreTypes[hit.scoreType].name;
		};

		self.isHitSelected = function(hit){
			return selectedHit === hit;
		};

		self.selectHit = function(hit){
			selectedHit = undefined;

			var scoreType = scoreTypes[hit.scoreType];
			if(scoreType.points.length === 1){
				exchanges.push({side: hit.side, type:hit.scoreType, points: scoreType.points[0]});
				redoQueue = [];
				return;
			}

			selectedHit = hit;
		};

		self.cancelHit = function(){
			selectedHit = undefined;
		};

		self.selectPoints = function(points){
			exchanges.push({side: selectedHit.side, type:selectedHit.scoreType, points: points});
			redoQueue = [];
			selectedHit = undefined;
		};

		self.hitPoints = function(hit){
			return scoreTypes[hit.scoreType].points;
		};

});
