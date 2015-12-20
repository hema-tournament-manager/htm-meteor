HtmAdministration.controller('TournamentsCtrl', function($reactive, $scope) {
  $reactive(this).attach($scope);

  this.helpers({
    list() {
      return Tournaments.find({}, {order: {name: 1}, fields: {name: 1, identifier: 1}});
    }
  });
});

HtmAdministration.controller('TournamentViewCtrl', function($reactive, $scope, tournamentIdentifier) {
  $reactive(this).attach($scope);
  this.helpers({
    object() {
      return Tournaments.findOne({identifier: tournamentIdentifier});
    }
  });
});

var PhaseCtrl = function ($reactive, $scope, $state, tournamentIdentifier, phaseIndex) {
  $reactive(this).attach($scope);

  var self = this;

  this.helpers({
    tournament() {
      return Tournaments.findOne({identifier: tournamentIdentifier});
    },
    phase() {
      return this.tournament.phases[phaseIndex];
    },
    previousPhase() {
      return phaseIndex > 0 ? tournament.phases[phaseIndex - 1] : false;
    },
    index: phaseIndex,
    object() {
      return this.phase;
    },
    allParticipants() {
      return Participants.find({}, {order: {number: -1}, fields: {name: 1}});
    },
    participants() {
      return this.phase.participants;  
    },
    nonParticipants() {
      var participantIds = _.pluck(this.participants, 'id');
      return phaseIndex > 0 ? _.reject(this.previousPhase.participants, function(p) { return _.contains(participantIds, p.id); }) : [];
    },
    settings() {
      return this.phase.settings;  
    }
  });

  this.participantByNumber = function(number) {
    return this.tournament.phases[0].participants[number - 1] || 'Fighter ' + number;
  };

  /// ENROLLED
  this.helpers({
    participantNumbers() {
      return _.range(1, this.phase.settings.participantCount + 1);
    }
  });

  /// POOLS
  this.helpers({
    pools() {
      if (this.phase.type === 'pool') {
        return this.phase.settings.pools;
      } else {
        return [];
      }
    }
  });

  this.addPool = function() {
    if (this.phase.type === 'pool') {
      this.phase.settings.pools.push(String.fromCharCode(65 + this.phase.settings.pools.length));
    }
  };

};

HtmAdministration.controller('EnrolledPhaseCtrl', PhaseCtrl);
HtmAdministration.controller('PoolPhaseCtrl', PhaseCtrl);
HtmAdministration.controller('EliminationPhaseCtrl', PhaseCtrl);
HtmAdministration.controller('FinalesPhasesCtrl', PhaseCtrl);
