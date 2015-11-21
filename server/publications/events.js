Meteor.publish('arenas', function(options) {
  return Arenas.find({},options);
});