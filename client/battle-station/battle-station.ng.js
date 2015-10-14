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
		var selectedActions = [];
		var currentCounter = undefined;

		var counters = {

		}

		var scoreTypes = {
			'clean-hit': {name:'Clean Hit', actions: [
				{
					points: [1,2,3],
					action: function(counters, side, other, points){
						counters['exchanges'] += 1;						
						counters['clean-hit-' + side] += points;
						counters['total-' + side] += points;
					}
				}
			]}, 
			'double-hit': {name:'Double Hit', actions: [
				{
					points: [1],
					action: function(counters, side, other, points){
						counters['exchanges'] += 1;												
						counters['double-hit'] += points;
						counters['total-' + side] += points;
					}
				},{
					points: [1],
					action: function(counters, side, other, points){
						counters['exchanges'] += 1;												
						counters['double-hit'] += points;
						counters['total-' + side] += points;
					}
				}
			]},
			'after-blow': {name:'After Blow',  actions: [
				{
					points: [1,2,3],
					action: function(counters, side, other, points){
						counters['exchanges'] += 1;																		
						counters['after-blow-' + side] += points;
						counters['total-' + side] += points;
					}
				},{
					points: [1,2],
					action: function(counters, side, other, points){
						counters['exchanges'] += 1;												
						counters['after-blow-' + other] += points;
						counters['total-' + other] += points;						
					}
				},
			]},
			'none': {name:'No Hit',  actions: [
				{
					points: [0],
					action: function(counters, side, other, points){
						counters['exchanges'] += 1;												
						counters['no-hit'] += points;
					}
				}
			]}
		};

		self.hitGroups = [
			[{
				side: 'blue',
				other: 'red',
				scoreType: 'clean-hit'
			},{
				side: 'blue',
				other: 'red',
				scoreType: 'after-blow'
			}],[{
				side: undefined,
				other: undefined,
				scoreType: 'double-hit'
			},{
				side: undefined,
				other: undefined,
				scoreType: 'none'
			}],[{
				side: 'red',
				other: 'blue',
				scoreType: 'clean-hit'
			},{
				side: 'red',
				other: 'blue',
				scoreType: 'after-blow'
			}]
		];

		self.undo = function(){
			if(self.cantUndo()){
				return;
			}

			selectedHit = undefined;
			currentCounter = undefined;

			redoQueue.push(exchanges.pop());
		};

		self.redo = function(){
			if(self.cantRedo()){
				return;
			}

			selectedHit = undefined;
			currentCounter = undefined;

			exchanges.push(redoQueue.pop());			
		};

		self.cantRedo = function(){
			return _.isEmpty(redoQueue);
		};

		self.cantUndo = function(){
			return _.isEmpty(exchanges);
		};

		self.score = function(side){
			return 0;
		};

		self.exchange = function(){
			return exchanges.length;
		};

		self.hitName = function(hit){
			return scoreTypes[hit.scoreType].name;
		};
		self.hitClass = function(hit){
			if(angular.isDefined(hit.side)){
				return hit.side + "-" + hit.scoreType;
			} else {
				return hit.scoreType;
			}
		};

		self.isHitSelected = function(hit){
			return selectedHit === hit;
		};

		self.selectHit = function(hit){
			selectedHit = hit;
			currentCounter = {};
			finishOrContinue(scoreTypes[hit.scoreType].actions);
		};

		function finishOrContinue(actions){
			selectedActions = advanceActions(actions);

			if(_.isEmpty(selectedActions)){
				redoQueue = [];
				exchanges.push(currentCounter);
				selectedHit = undefined;
				currentCounter = undefined;
				return;
			}
		}

		function advanceActions(actions){
			actions = actions.slice(0); // copy

			while(!_.isEmpty(actions)){

				if(actions[0].points.length > 1){
					return actions;
				}

				var action = actions.shift();
				if(_.isEmpty(action.points)){
					applyAction();
				} else {
					applyAction(action, action.points[0]);
				}
			}

			return actions; //empty
		}

		function applyAction(action, points){
			action.action(currentCounter, selectedHit.side, selectedHit.other, points);
		}

		self.cancelHit = function(){
			selectedHit = undefined;
			currentCounter = undefined;
		};

		self.selectPoints = function(points){
			var action = selectedActions.shift();
			applyAction(action,points);
			finishOrContinue(selectedActions);
		};

		self.hitPoints = function(hit){
			if(_.isEmpty(selectedActions)){
				return [];
			}
			
			return selectedActions[0].points;
		};

});
