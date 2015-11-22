Meteor.startup(function() {


  if (Arenas.find().count() === 0) {   
    Arenas.insert({
    	name: 'Cotton Candy Forest',
    	identifier: 'cotton-candy-forest'
    });
	Arenas.insert({
		name: 'Rock Candy Mountains',
		identifier: 'rock-candy-mountains'
	});
	Arenas.insert({
		name: 'Uncle Gumbald\'s cabin',
		identifier: 'uncle-gumbalds-cabin',
	});
  }
});