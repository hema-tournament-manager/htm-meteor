Tournaments = new Mongo.Collection('tournaments');

Tournaments.before.insert(function(userId, doc) {
  Meteor.call('updateParticipantSubscriptions', doc);
});

Tournaments.after.update(function(userId, doc, fieldNames, modifier, options) {
  Meteor.call('updateParticipantSubscriptions', doc);
});

Tournaments.helpers({
  poolPhase: function() {
    return _.findWhere(this.phases, {type: 'pool'});
  }
});

Meteor.methods({
  updateParticipantSubscriptions: function(tournament) {
    if (_.isObject(tournament.participants)) {
      console.log('updateParticipantSubscriptions');

      // everyone in this tournament must have this tournament in their list of tournaments
      var t = {};
      t['tournaments.' + tournament._id + '.id'] = tournament._id;
      t['tournaments.' + tournament._id + '.name'] = tournament.name;
      Participants.direct.update({_id: {$in: Object.keys(tournament.participants)}}, {$set: t});

      var unset = {};
      unset['tournaments.' + tournament._id] = 1;
      // everyone NOT in this tournament must NOT have this tournament in their list of tournaments
      Participants.direct.update({_id: {$nin: Object.keys(tournament.participants)}}, {$unset: unset});
    }
  },
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
  }
});