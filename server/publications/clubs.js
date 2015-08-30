Meteor.publish('clubs', function () {
  return Clubs.find({});
});

