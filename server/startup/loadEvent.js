Meteor.startup(function() {


  if (Arenas.find().count() === 0) {   
    Arenas.insert({name: 'Cotton Candy Forest'});
	Arenas.insert({name: 'Rock Candy Mountains'});
	Arenas.insert({name: 'Uncle Gumbald\'s cabin'});
  }
});