angular.module('htm.battle-station')
	.controller('ScheduledFightsCtrl', function($scope, $meteor, $stateParams) {
		var self = this;
		//TODO: Pass Arena in from routes.js
		self.arenaId = $stateParams.arenaId;
		self.fights = [{name:'Of the Century'},{name:'For the Galaxy'}];


});