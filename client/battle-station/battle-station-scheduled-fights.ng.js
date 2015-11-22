angular.module('htm.battle-station')
	.controller('ScheduledFightsCtrl', function($scope, $meteor, $stateParams) {
		var self = this;
		self.tournaments = [];

		if($stateParams.arenaId){
			self.arenaIdentifier = $stateParams.arenaId;	
		} else {
			$scope.$meteorSubscribe('arenas').then(function(subscription){
				self.arenaIdentifier = $meteor.collection(Arenas)[0].identifier;
			});
		}

		$scope.$meteorSubscribe('tournaments').then(function(subscriptionHandle) {
    		self.tournaments = $scope.$meteorCollection(function() {
      			return Tournaments.find({});
    		});
  		});
});