Tournaments = new Mongo.Collection('tournaments');

Tournaments.before.insert(function(userId, doc) {
  Meteor.call('updateParticipantSubscriptions', doc);
});

Tournaments.before.update(function(userId, doc, fieldNames, modifier, options) {
  Meteor.call('updateParticipantSubscriptions', doc);

  var poolPhase = _.findWhere(modifier.$set.phases, {type: 'pool'});
  if (poolPhase) {
    poolPhase.pools = poolPhase.pools || [];
    poolPhase.poolCount = poolPhase.poolCount || 1;
    if (poolPhase.poolCount > 26) {
      poolPhase.poolCount = 26;
    }
    if (poolPhase.pools.length > poolPhase.poolCount) {
      while (poolPhase.pools.length > poolPhase.poolCount) {
        poolPhase.pools.pop();
      }
    } else {
      while (poolPhase.pools.length < poolPhase.poolCount) {
        poolPhase.pools.push({name: String.fromCharCode('A'.charCodeAt(0) + poolPhase.pools.length)});
      }
    }
  }
});

Tournaments.helpers({
  poolPhase: function() {
    return _.findWhere(this.phases, {type: 'pool'});
  }
});

Meteor.methods({
  updateParticipantSubscriptions: function(tournament) {
    if (_.isArray(tournament.participants)) {
      console.log('updateParticipantSubscriptions');

      // everyone in this tournament must have this tournament in their list of tournaments
      Participants.direct.update({_id: {$in: tournament.participants}}, {$addToSet: {tournaments: tournament._id}});
      // everyone NOT in this tournament must NOT have this tournament in their list of tournaments
      Participants.direct.update({_id: {$nin: tournament.participants}}, {$pull: {tournaments: tournament._id}});
    }
  }
})