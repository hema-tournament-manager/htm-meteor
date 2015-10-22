angular.module('htm.administration').controller('TournamentsCtrl', function($meteor, $scope) {
  this.list = $scope.$meteorCollection(function() {
    return Tournaments.find({}, {order: {name: 1}, fields: {name: 1, identifier: 1}});
  });
});

angular.module('htm.administration').controller('TournamentViewCtrl', function($meteor, $scope, $stateParams) {
  this.object = $scope.$meteorObject(Tournaments, $stateParams.tournamentId, true);
  this.unsubscribedParticipants = $scope.$meteorCollection(function() {
    return Participants.find({tournaments: {$ne: $stateParams.tournamentId}});
  });
  this.subscribeParticipant = function(p) {
    Meteor.call('subscribeParticipantToTournament', p._id, $stateParams.tournamentId);
  };
  this.addPool = function(t) {
    Meteor.call('tournament.addPool', t._id);
  };
});
