Tournaments = new Mongo.Collection('tournaments');

Tournaments.helpers({
  poolPhase: function() {
    return _.findWhere(this.phases, {type: 'pool'});
  }
});

Meteor.methods({
  'tournament.addPool': function(tournamentId) {
    check(tournamentId, String);

    var tournament = Tournaments.findOne(tournamentId);
    var phases = tournament.phases;
    for (var i = 0; i < phases.length; i++) {
      var phase = phases[i];
      if (phase.type === 'pool') {
        phase.pools = phase.pools || [];
        if (phase.pools.length < 26) {
          var update = {$push: {}};
          update['$push']['phases.'+i+'.pools'] = {name: String.fromCharCode('A'.charCodeAt(0) + phase.pools.length)};
          Tournaments.update(tournament._id, update);
        }
      }
    }
  },
  'enrollParticipantInTournament': function(participantId, tournamentId) {
    check(participantId, String);
    check(tournamentId, String);

    Tournaments.update(
      {
        _id: tournamentId,
        'phases.0.participants.id': {$nin: [participantId]}
      }, {
        $push: {'phases.0.participants': {id: participantId}}
      }
    );
  }
});