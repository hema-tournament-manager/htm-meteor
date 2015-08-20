Meteor.publish('counts', function() {
  Counts.publish(this, 'participants-count', Participants.find());
  Counts.publish(this, 'tournaments-count', Tournaments.find());
});