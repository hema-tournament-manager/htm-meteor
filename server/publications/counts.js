Meteor.publish('counts', function() {
  Counts.publish(this, 'participants-count', Participants.find());
});