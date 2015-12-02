Tournaments = new Mongo.Collection('tournaments');

var indexToPoolName = function(poolIndex) {
  return String.fromCharCode('A'.charCodeAt(0) + poolIndex);
};

Tournaments.helpers({
  poolPhase: function() {
    return _.findWhere(this.phases, {type: 'pool'});
  }
});

Tournaments.before.update(function(userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set['phases.0.settings.participantCount'] = doc.phases[1].settings.poolCount * doc.phases[1].settings.poolSize;
  var poolSize = +modifier.$set['phases.1.settings.poolSize'] || doc.phases[1].settings.poolSize;
  var poolCount = +modifier.$set['phases.1.settings.poolCount'] || doc.phases[1].settings.poolCount;
  
   // force count and size to be numbers in the database
  modifier.$set['phases.1.settings.poolSize'] = poolSize;
  modifier.$set['phases.1.settings.poolCount'] = poolCount;

  modifier.$set['phases.1.settings.pools'] = _.range(0, poolCount).map(indexToPoolName);
  modifier.$set['phases.1.participants'] = _.flatten(_.range(0, poolSize).map(function(poolPart) {
    return _.range(0, poolCount).map(function(poolIndex) {
      return {
        pool: indexToPoolName(poolIndex),
        index: poolPart * poolCount + poolIndex
      };
    });
  }));
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

    Tournaments.update({
      _id: tournamentId,
      'phases.0.participants': {$nin: [participantId]}
    }, {
      $push: {'phases.0.participants': participantId}
    });
  },
  'withdrawParticipantFromTournament': function(participantId, tournamentId) {
    check(participantId, String);
    check(tournamentId, String);

    if (!Tournaments.findOne({
      _id: tournamentId,
      'phases.1.participants': participantId
    })) {
      Tournaments.update(tournamentId, {$pull: {'phases.0.participants': participantId}});
      return true;
    } else {
      return false;
    }
  }
});