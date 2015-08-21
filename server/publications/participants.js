Meteor.publish('participants', function (query,options) {
  console.log("participants query " + query);
  return Participants.find(

  	{ $or: [ 
  				{'name': { $regex:query, $options: 'i'}},
  				{'club.name': { $regex:query, $options: 'i'}},
				{'club.code': { $regex:query, $options: 'i'}},
				{'country.code2': { $regex:query, $options: 'i'}},
				{'country.name': { $regex:query, $options: 'i'}},
  	]}


  	, options);

  // return Participants.find();
});

