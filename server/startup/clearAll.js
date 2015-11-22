Meteor.startup(function() {
	Tournaments.remove({});
	Participants.remove({});  
	Clubs.remove({});
	Countries.remove({});
	Arenas.remove({});
});