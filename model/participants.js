/*
 *  participants: {name, number, club?: {name, code}, country?: {code2, code3, name}, tournaments:[]}
 */
Participants = new Mongo.Collection('participants');

Participants.before.insert(function(userId, doc) {
  doc.number =  '' + (Participants.find().count() + 1); // Intentionally a string
  doc.tournaments = doc.tournaments || {};

 
  Meteor.call('updateParticipantCountry', doc);
  Meteor.call('updateTournamentSubscriptions', doc);
  Meteor.call('updateParticipantClub', doc);
});

Participants.after.update(function(userId, doc, fieldNames, modifier, options) {
  Meteor.call('updateTournamentSubscriptions', doc);
  Meteor.call('updateParticipantClub', doc);
});

Participants.helpers({
  inTournament: function(t) {
    var id = t._id || t;
    return this.tournaments && this.tournaments[id];
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

  updateParticipantCountry: function(participant) {
    if(participant.country && !participant.country._id){
      participant.country = Countries.findOne({code2:participant.country.code2});
    } 
  },


  updateParticipantClub: function(participant) {
    if(!participant.club || !!participant.club._id){
      return;
    }

    if(!participant.club.name && !participant.club.code){
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
    var tournament = Tournaments.findOne(tournamentId);
    var t = {};
    t['tournaments.' + tournament._id] = {id: tournament._id, name: tournament.name};

    Participants.update(participantId, {$set: t});
  },

  updateTournamentSubscriptions: function(participant) {
    if (_.isObject(participant.tournaments)) {
      console.log('updateTournamentSubscriptions', participant);

      var p = {};
      p['participants.' + participant._id + '.id'] = participant._id;
      p['participants.' + participant._id + '.name'] = participant.name;
      // every tournament that this participant is participating in should have this participant in their list of participants
      Object.keys(participant.tournaments).forEach(function(tournamentId) {
        p['participants.' + participant._id + '.pool'] = participant.tournaments[tournamentId].pool;
        Tournaments.direct.update(tournamentId, {$set: p});
      });

      var unset = {};
      unset['participants.' + participant._id] = 1;
      // every tournament that this participant is NOT participating in should NOT have this participant in their list of participants
      Tournaments.direct.update({_id: {$nin: Object.keys(participant.tournaments)}}, {$unset: unset});
    }
  }
});

