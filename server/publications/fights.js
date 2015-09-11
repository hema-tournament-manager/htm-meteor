Meteor.publish('fights', function () {
  return Fights.find({});
});

