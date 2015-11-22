angular.module('htm.battle-station')
	.controller('ScheduledFightsCtrl', function($scope, $meteor, $stateParams) {
		var self = this;

		if($stateParams.arenaId){
			self.arenaId = $stateParams.arenaId;	
		} else {
			$scope.$meteorSubscribe('arenas').then(function(subscription){
				self.arenaId = $meteor.collection(Arenas)[0]._id;
			});
		}

		self.fights = [{name:'Of the Century'},{name:'For the Galaxy'}];

});