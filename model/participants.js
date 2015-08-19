Participants = new Mongo.Collection('participants');

Meteor.methods({
  insertParticipants: function(participants) {
    var q = Participants.find();
    participants.forEach(function(p) {
      if (!p.number) {
        p.number = q.count() + 1;
      }
      Participants.insert(p);
    });
  },

  insertParticipant: function(participant) {
    Meteor.call('insertParticipants', [participant]);
  }
});