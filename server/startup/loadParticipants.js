Meteor.startup(function() {


  if (Participants.find().count() === 0) {
    var candyKingdom = Countries.findOne({code2:'CK'});
    var landOfOoo = Countries.findOne({code2:'IO'});

    Participants.insert({name:'Finn', country: candyKingdom, club: {name: "Tree Fort", code: "TF" }});
    Participants.insert({name:'Jake', country: landOfOoo, club: {name: "Tree Fort", code: "TF" }});
    Participants.insert({name:'Marceline The Vampire Queen', country: landOfOoo, club: {name: "Marceline's House", code: "MH" }});
    Participants.insert({name:'Princess Bubblegum', country: candyKingdom, club: {name: "The Candy Castle", code: "TCC" }});

  }
});