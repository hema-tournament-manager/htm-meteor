angular.module('htm.battle-station')
	.controller('BattleStationCtrl', function($scope, $meteor, $state, $stateParams) {
		var self = this;

		//TODO: Resolve arena, tournament and fighters in route

		$scope.$meteorSubscribe('arenas').then(function(){
			self.arena = $scope.$meteorObject(Arenas, {identifier: $stateParams.arenaId});
		});

		$scope.$meteorSubscribe('tournaments').then(function(){
			self.tournament =  $scope.$meteorObject(Tournaments, {identifier:$stateParams.tournamentId});
			//TODO: Use scheduled
			self.fight = _.findWhere(_.flatten(_.pluck(_.pluck(self.tournament.phases, 'fights'),'planned')),{_id: $stateParams.fightId});
			self.fighterA = $scope.$meteorObject(Participants,self.fight.fighterA);
			self.fighterA.subscribe('participants');
			self.fighterB = $scope.$meteorObject(Participants,self.fight.fighterB);
			self.fighterB.subscribe('participants');
		});

		var exchanges  = [];
		var redoQueue = [];
		var selectedHit = undefined;
		var selectedActions = [];
		var currentCounter = undefined;

		var counters = {
			red: 'total-red',
			neutral: 'exchanges',
			blue: 'total-blue',
		};

		function addCounter(counters,name, points){
			counters[name] = (counters[name] || 0) + points; 
		}

		var scoreTypes = {
			'clean-hit': {name:'Clean Hit', actions: [
				{
					points: [1,2,3],
					action: function(counters, side, other, points){
						addCounter(counters,'exchanges', 1);						
						addCounter(counters,'clean-hit-' + side, points);
						addCounter(counters,'total-' + side, points);
					}
				}
			]}, 


			'double-hit': {name:'Double Hit', actions: [
				{
					points: [1],
					action: function(counters, side, other, points){
						addCounter(counters,'exchanges', 1);												
						addCounter(counters,'double-hit', points);
						addCounter(counters,'total-' + side, points);
						addCounter(counters,'total-' + other, points);

					}
				}
			]},
			'after-blow': {name:'After Blow',  actions: [
				{
					points: [1,2,3],
					action: function(counters, side, other, points){
						addCounter(counters,'exchanges', 1);																		
						addCounter(counters,'after-blow-' + side, points);
						addCounter(counters,'total-' + side, points);
					}
				},{
					points: [1,2],
					action: function(counters, side, other, points){
						addCounter(counters,'after-blow-' + other, points);
						addCounter(counters,'total-' + other, points);						
					}
				},
			]},
			'no-hit': {name:'No Hit',  actions: [
				{
					points: [0],
					action: function(counters, side, other, points){
						addCounter(counters,'exchanges', 1);												
						addCounter(counters,'no-hit', points);
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
				scoreType: 'no-hit'
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
			return _.isEmpty(redoQueue)  // Can't redo when there are no exchanges to redo 
				|| !_.isEmpty(selectedActions); // Can't redo when we have selected actions to process
		};

		self.cantUndo = function(){
			return _.isEmpty(exchanges)  // Can't undo when there are no exchanges to undo 
			|| !_.isEmpty(selectedActions); // Can't undo when we have selected actions to process
		};

		function sum(memo, num){
			return memo + (num || 0);
		}

		self.score = function(side){
			return _.reduce(_.pluck(exchanges, counters[side]), sum, 0);
		};

		self.exchange = function(){
			return _.reduce(_.pluck(exchanges, counters.neutral), sum, 0);
		};

		self.hitName = function(hit){
			return scoreTypes[hit.scoreType].name;
		};
		self.hitClass = function(hit, points){
			var id = undefined;

			if(angular.isDefined(hit.side)){
				id = hit.side + "-" + hit.scoreType;
			} else {
				id = hit.scoreType;
			}

			if(angular.isDefined(points)){
				id += '-' + points;
			}

			return id;
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
