angular.module('htm.administration').controller('TournamentsCtrl', function($meteor, $scope) {
  this.list = $scope.$meteorCollection(function() {
    return Tournaments.find({}, {order: {name: 1}, fields: {name: 1, identifier: 1}});
  });
});

angular.module('htm.administration').controller('TournamentViewCtrl', function($meteor, $scope, $stateParams) {
  this.object = $scope.$meteorObject(Tournaments, $stateParams.tournamentId, false);
  this.unsubscribedParticipants = $scope.$meteorCollection(function() {
    return Participants.find({tournaments: {$ne: $stateParams.tournamentId}});
  });
});

angular.module('htm.administration').controller('PhaseCtrl', function($meteor, $scope, $state, tournamentId, phaseIndex) {
  var tournament = $scope.$meteorObject(Tournaments, tournamentId, true);
  var phase = tournament.phases[phaseIndex];
  this.index = phaseIndex;
  this.object = phase;

  var self = this;
  $scope.$meteorSubscribe('participants', {}, {sort: { number : -1 }}).then(function(subscriptionHandle) {
    var participantIds = phase.participants.map(function(p) { return p.id; });
    self.participants = $scope.$meteorCollection(function() {
      return Participants.find({_id: {$in: participantIds}}, {order: {number: -1}, fields: {name: 1}});
    });
    self.nonParticipants = $scope.$meteorCollection(function() {
      if (phaseIndex === 0) {
        return Participants.find({_id: {$nin: participantIds}}, {order: {number: -1}, fields: {name: 1}});
      } else {
        var previousParticipantIds = tournament.phases[phaseIndex - 1].participants.map(function(p) { return p.id; });
        return Participants.find({_id: {$in: _.difference(previousParticipantIds, participantIds)}}, {order: {number: -1}, fields: {name: 1}});
      }
    });
  });

  if (phaseIndex < 1 || this.object.fights.length == 0) {
    $state.go('.participants');
  } else {
    $state.go('.fights');
  }

  this.addPool = function() {
    if (this.object.type === 'pool') {
      this.object.settings.pools.push('A');
    }
  };

  this.addParticipant = function(participant, attributes) {
    var participantId = participant.id || participant._id;
    var p = _.findWhere(this.object.participants, {id: participantId}) || _.findWhere(this.object.participants, {_id: participantId});
    if (p) {
      p.pool = attributes.pool;
    } else {
      this.object.participants.push(angular.extend(angular.extend(angular.copy(participant), attributes || {}), {id: participantId}));
    }
  };
});
