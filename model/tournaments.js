Tournaments = new Mongo.Collection('tournaments');

Tournaments.before.insert(function(userId, doc) {
  Meteor.call('updateParticipantSubscriptions', doc);
});

Tournaments.before.update(function(userId, doc, fieldNames, modifier, options) {
  Meteor.call('updateParticipantSubscriptions', doc);
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