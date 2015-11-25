angular.module('htm.battle-station')
	.controller('ScheduledFightsCtrl', function($scope, $meteor, $stateParams) {
		var self = this;
		self.tournaments = [];
		var participants = [];

		if($stateParams.arenaId){
			self.arenaIdentifier = $stateParams.arenaId;	
		} else {
			self.arenaIdentifier = $scope.$meteorCollection(Arenas)[0].identifier;
		}

		self.tournaments = $scope.$meteorCollection(Tournaments);
		participants = $scope.$meteorCollection(Participants);

  		self.fighterName = function(fighterId){
  			return _.findWhere(participants,{_id:fighterId}).name;
  		}
});