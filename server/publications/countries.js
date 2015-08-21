Meteor.publish('countries', function (options) {
  return Countries.find({},options);
});

