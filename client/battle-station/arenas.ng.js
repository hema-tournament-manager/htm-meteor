angular.module('htm.battle-station')
	.controller('ArenasCtrl', function($scope, $meteor) {
		var self = this;
		self.arenas = [];

		$scope.$meteorSubscribe('arenas').then(function(subscription){
			self.arenas = $meteor.collection(Arenas);
		});

});