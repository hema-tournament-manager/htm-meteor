Meteor.publish('participants', function(selector, options) {
  selector = selector || {};
  return Participants.find(selector, options);
});

Meteor.publish('participantsSearch', function (query,options) {
  return Participants.find(
  	{ $or: [ 
  				{'name': { $regex:query, $options: 'i'}},
          {'number': { $regex:query, $options: 'i'}},
    			{'club.name': { $regex:query, $options: 'i'}},
  				{'club.code': { $regex:query, $options: 'i'}},
  				{'country.code2': { $regex:query, $options: 'i'}},
  				{'country.name': { $regex:query, $options: 'i'}},
  	]}, options );
});
