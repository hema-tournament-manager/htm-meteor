/*
 *  participants: {name, club: {name, code}, country: {code2, code3, name}, tournaments:[]}
 */
Participants = new Mongo.Collection('participants');

Participants.before.insert(function(userId, doc) {
  doc.number = Participants.find().count() + 1;
  doc.tournaments = doc.tournaments || [];

  if(!doc.country._id){
    doc.country = Countries.findOne({code2:doc.country.code2});
  }

  Meteor.call('updateTournamentSubscriptions', doc);
  Meteor.call('updateParticipantClub', doc);
});

Participants.before.update(function(userId, doc, fieldNames, modifier, options) {
  Meteor.call('updateTournamentSubscriptions', doc);
  Meteor.call('updateParticipantClub', doc);
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
    participants.forEach(function(p) {
      Participants.insert(p);
    });
  },

  updateParticipantClub: function(participant) {
    if(!participant.club || !!participant.club._id){
      return;
    }

    var insertedId = Clubs.upsert(participant.club,participant.club);
    if(insertedId){
      participant.club = Clubs.find(insertedId);
    } else {
      participant.club = Clubs.find(participant.club);
    }
  },

  subscribeParticipantToTournament: function(participantId, tournamentId) {
    Participants.update(participantId, {$addToSet: {tournaments: tournamentId}});
  },
  updateTournamentSubscriptions: function(participant) {
    if (_.isArray(participant.tournaments)) {
      // every tournament that this participant is participating in should have this participant in their list of participants
      Tournaments.direct.update({_id: {$in: participant.tournaments}}, {$addToSet: {participants: participant._id}});
      // every tournament that this participant is NOT participating in should NOT have this participant in their list of participants
      Tournaments.direct.update({_id: {$nin: participant.tournaments}}, {$pull: {participants: participant._id}});
    }
  }
});

