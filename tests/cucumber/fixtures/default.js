(function () {

	'use strict';

	Meteor.methods({
		reset: function() {
			Participants.remove({});
			Tournaments.remove({});
			Clubs.remove({});
		},

		createTheLandOfOoo: function() {
			Countries.remove({});
			var countries = [
				{code2:''  , code3: ''   , name:'Unknown'},
				{code2:'IO', code3: 'IOT', name:'Land of Ooo'},
				{code2:'LA', code3: 'LAO', name:'Land of Aaa'},
  				{code2:"CK", code3: "COK", name:"Candy Kingdom"},
			];

			countries.forEach(function(country) {
				Countries.insert(country);
			});
		},
		createTheCandyCastle: function() {
			Clubs.insert({name:'The Candy Castle', code:'TCC'});
		},
		createFinn: function() {
			var candyKingdom = Countries.findOne({name:'Candy Kingdom'});
			Participants.insert({name:'Finn', country: candyKingdom, club: {name: "Tree Fort", code: "TF" }});
		},

		createJake: function() {
			var landOfOoo = Countries.findOne({name:'Land of Ooo'});
			Participants.insert({name:'Jake', country: landOfOoo, club: {name: "Tree Fort", code: "TF" }});
		},

		createMarceline: function() {
			var landOfOoo = Countries.findOne({name:'Land of Ooo'});
			Participants.insert({name:'Marceline', country: landOfOoo, club: {name: "Marceline's House", code: "MH" }});
		},

		createPrincessBubblegum: function() {
			var candyKingdom = Countries.findOne({name:'Candy Kingdom'});
			Participants.insert({name:'Princess Bubblegum', country: candyKingdom, club: {name: "The Candy Castle", code: "TCC" }});
		},		
	});

})();