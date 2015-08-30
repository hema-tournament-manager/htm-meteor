Clubs = new Mongo.Collection('clubs');

Meteor.methods({

  /*
   *  club: {name: '', code: ''} 
   */
  addClub: function(club) {
   	Clubs.upsert(club,club);
  },
});

