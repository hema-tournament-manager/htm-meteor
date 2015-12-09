/*
 *  participants: {name, number, club?: {name, code}, country?: {code2, code3, name}, tournaments:[]}
 */
Participants = new Mongo.Collection('participants');

Participants.before.insert(function(userId, doc) {
  doc.number =  '' + (Participants.find().count() + 1); // Intentionally a string
 
  Meteor.call('updateParticipantCountry', doc);
  Meteor.call('updateParticipantClub', doc);
});

Participants.after.update(function(userId, doc, fieldNames, modifier, options) {
  Meteor.call('updateParticipantClub', doc);
});

Participants.helpers({
  inTournament: function(t) {
    return _.contains(t.phases[0].participants, this._id);
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
  }
});

