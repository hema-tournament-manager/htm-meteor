Participants = new Mongo.Collection('participants');

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
});

