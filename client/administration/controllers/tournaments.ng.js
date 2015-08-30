angular.module('htm.administration').controller('TournamentsCtrl', function($meteor, $scope) {
  this.list = $scope.$meteorCollection(function() {
    return Tournaments.find({}, {order: {name: 1}, fields: {name: 1, identifier: 1}});
  });
});

angular.module('htm.administration').controller('TournamentViewCtrl', function($meteor, $scope, $stateParams) {
  this.object = $scope.$meteorObject(Tournaments, {identifier: $stateParams.tournamentIdentifier}, true);
  var t = this.object;
  this.unsubscribedParticipants = $scope.$meteorCollection(function() {
    return Participants.find({tournaments: {$ne: t._id}});
  });
  this.subscribeParticipant = function(p) {
    Meteor.call('subscribeParticipantToTournament', p._id, this.object._id);
  };
});

angular.module('htm.administration').controller('TournamentViewPhaseCtrl', function($meteor, $scope, $stateParams) {
  this.object = $scope.tournament.object.phases[$stateParams.phaseIndex];
});