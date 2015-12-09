angular.module('htm.administration').controller('TournamentsCtrl', function($meteor, $scope) {
  this.list = $scope.$meteorCollection(function() {
    return Tournaments.find({}, {order: {name: 1}, fields: {name: 1, identifier: 1}});
  });
});

angular.module('htm.administration').controller('TournamentViewCtrl', function($meteor, $scope, tournamentId) {
  this.object = $scope.$meteorObject(Tournaments, tournamentId, false);
});

var PhaseCtrl = function ($meteor, $scope, $state, tournamentId, phaseIndex) {
  var tournament = $scope.$meteorObject(Tournaments, tournamentId, true);
  var phase = function() { return tournament.phases[phaseIndex] };
  var previousPhase = function() { return phaseIndex > 0 ? tournament.phases[phaseIndex - 1] : false; };
  this.index = phaseIndex;
  this.object = phase;

  var self = this;
  $scope.$meteorSubscribe('participants', {}, {sort: { number : -1 }}).then(function(subscriptionHandle) {
    self.allParticipants = $scope.$meteorCollection(function() {
      return Participants.find({}, {order: {number: -1}, fields: {name: 1}});
    });
  });

  this.participants = function() {
    return phase().participants;
  };

  this.nonParticipants = function() {
    var participantIds = _.pluck(this.participants(), 'id');
    return phaseIndex > 0 ? _.reject(previousPhase().participants, function(p) { return _.contains(participantIds, p.id); }) : [];
  };

  this.pools = function() {
    if (phase().type === 'pool') {
      return phase().settings.pools;
    } else {
      return [];
    }
  };

  this.settings = function() {
    return phase().settings;
  }

  this.addPool = function() {
    if (phase().type === 'pool') {
      phase().settings.pools.push(String.fromCharCode(65 + phase().settings.pools.length));
    }
  };

  this.addParticipant = function(participant, attributes) {
    if (participant) {
      var p = _.findWhere(phase().participants, {id: participant.id});
      if (p) {
        Object.keys(attributes).forEach(function(key) {
          p[key] = attributes[key];
        });
      } else {
        phase().participants.push(angular.extend(angular.copy(participant), attributes || {}));
      }
    }
  };

  this.dropParticipant = function(participant) {
    if (participant) {
      phase().participants = _.reject(phase().participants, function(p) { return p.id === participant.id; });
    }
  };

  this.generatePoolFights = function(pool) {
    if (phase().type === 'pool') {
      var ps = _.where(phase().participants, {pool: pool});
      if (ps.length > 1) {
        for (var i = 0; i < ps.length - 1; i++) {
          var a = ps[i];
          var b = ps[i + 1];
          phase().fights.planned.push({
            _id: new Meteor.Collection.ObjectID()._str,
            number: i + 1,
            pool: pool,
            fighterA: a.id,
            fighterB: b.id
          });
        }
      }
    }
  };
};

angular.module('htm.administration').controller('EnrolledPhaseCtrl', PhaseCtrl);
angular.module('htm.administration').controller('PoolPhaseCtrl', PhaseCtrl);
angular.module('htm.administration').controller('EliminationPhaseCtrl', PhaseCtrl);
angular.module('htm.administration').controller('FinalesPhasesCtrl', PhaseCtrl);
