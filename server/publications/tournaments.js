Meteor.publish('tournaments', function (options) {
  return Tournaments.find({}, options);
});

