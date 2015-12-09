Tournaments = new Mongo.Collection('tournaments');

var indexToPoolName = function(poolIndex) {
  return String.fromCharCode('A'.charCodeAt(0) + poolIndex);
};

var roundRobinPairing = function(nrOfPeople, iteration) {
  var pin = 0;
  var rows = rotate(topRowForCount(nrOfPeople), bottomRowForCount(nrOfPeople), iteration);
  var topRow = rows[0];
  var bottomRow = rows[1];
  var result = _([pin].concat(topRow)).zip(_(bottomRow).reverse());

  if (nrOfPeople == 5 && (iteration == 3 || iteration == 4)) {
    // dirty hack to guarantee that people won't fight twice in a row
    return _(result).reverse();
  } else {
    return result;
  }
};

var topRowForCount = function(nrOfPeople) {
  return _.range(1, Math.floor((nrOfPeople + 1) / 2));
}

var bottomRowForCount = function(nrOfPeople) {
  return _.range(Math.floor((nrOfPeople + 1) / 2), nrOfPeople).concat(nrOfPeople % 2 == 1 ? [-1] : []);
};

var rotate = function(topRow, bottomRow, iterations) {
  if (iterations < 1) {
    return [topRow, bottomRow];
  } else {
    return rotate(
      [_(bottomRow).last()].concat(_.initial(topRow)),
      [_(topRow).last()].concat(_.initial(bottomRow)),
      iterations - 1
    );
  }
};

var calculateRoundRobin = function(nrOfPeople) {
  var maxNumberOfRounds = nrOfPeople - (nrOfPeople % 2 == 0 ? 1 : 0);
  return _(_.range(0, maxNumberOfRounds).map(function(i) { return roundRobinPairing(nrOfPeople, i); }))
    .flatten(true)
    .filter(function(pairing) {
      return pairing[0] !== -1 && pairing[1] !== -1;
    });
}

Tournaments.helpers({
  poolPhase: function() {
    return _.findWhere(this.phases, {type: 'pool'});
  }
});

Tournaments.before.update(function(userId, doc, fieldNames, modifier, options) {
  console.log('before tournament update');
  modifier.$set = modifier.$set || {};
  var poolSize = +modifier.$set['phases.1.settings.poolSize'] || doc.phases[1].settings.poolSize;
  var poolCount = +modifier.$set['phases.1.settings.poolCount'] || doc.phases[1].settings.poolCount;
  
  modifier.$set['phases.0.settings.participantCount'] = poolCount * poolSize;

  // force count and size to be numbers in the database
  modifier.$set['phases.1.settings.poolSize'] = poolSize;
  modifier.$set['phases.1.settings.poolCount'] = poolCount;

  var pools = _.range(0, poolCount).map(function() { return [] });
  modifier.$set['phases.1.settings.pools'] = _.range(0, poolCount).map(indexToPoolName);
  modifier.$set['phases.1.participants'] = _.flatten(_.range(0, poolSize).map(function(poolPart) {
    return _.range(0, poolCount).map(function(poolIndex) {
      var poolName = indexToPoolName(poolIndex);
      var fighterNumber = poolPart * poolCount + poolIndex + 1;
      pools[poolIndex].push(fighterNumber);
      return {
        pool: poolName,
        number: fighterNumber
      };
    });
  }));

  var pairings = calculateRoundRobin(poolSize);
  modifier.$set['phases.1.fights.planned'] = _.flatten(pools.map(function(pool, poolIndex) {
    return pairings.map(function(pairing) {
      return {
        pool: indexToPoolName(poolIndex),
        fighterA: {
          number: pool[pairing[0]]
        },
        fighterB: {
          number: pool[pairing[1]]
        }
      };
    });
  }), true);
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

    // first try to put this participant in an empty slot
    Tournaments.update({
      _id: tournamentId,
      'phases.0.participants': {$nin: [participantId], $elemMatch: {$in: [null], $exists: true}}
    }, {
      $set: {'phases.0.participants.$': participantId}
    });

    // if there was no empty slot we add the participant at the end of the list
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

    // other participants shouldn't get different numbers, so we put a null in the participant list
    Tournaments.update({
      _id: tournamentId,
      'phases.0.participants': participantId
    }, {
      $unset: {'phases.0.participants.$': true}
    });
  }
});