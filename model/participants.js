/*
 *  participants: {name: '', club: _clubId, country: _countryId} 
 */
Participants = new Mongo.Collection('participants');

Participants.before.insert(function(userId, doc) {
  Meteor.call('updateTournamentSubscriptions', doc);
});

Participants.before.update(function(userId, doc, fieldNames, modifier, options) {
  Meteor.call('updateTournamentSubscriptions', doc);
});

Participants.helpers({
  inTournament: function(t) {
    var id = t._id || t;
    return this.tournaments && id && this.tournaments.indexOf(id) > -1;
  }
});

Meteor.methods({
  addParticipants: function(participants) {
    if(!_.isArray(participants)){
      participants = [participants];
    }

    var q = Participants.find();

    participants.forEach(function(p) {
      p.number = q.count() + 1;
      Participants.insert(p);
    });
  },
  subscribeParticipantToTournament: function(participantId, tournamentId) {
    Participants.update(participantId, {$addToSet: {tournaments: tournamentId}});
  },
  updateTournamentSubscriptions: function(participant) {
    if (_.isArray(participant.tournaments)) {
      console.log('updateTournamentSubscriptions');

      // every tournament that this participant is participating in should have this participant in their list of participants
      Tournaments.direct.update({_id: {$in: participant.tournaments}}, {$addToSet: {participants: participant._id}});
      // every tournament that this participant is NOT participating in should NOT have this participant in their list of participants
      Tournaments.direct.update({_id: {$nin: participant.tournaments}}, {$pull: {participants: participant._id}});
    }
  }
});

