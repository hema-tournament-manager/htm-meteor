Meteor.startup(function() {

  if (Tournaments.find().count() === 0) {
    var tournaments = [
      {
        name: 'Open Longsword',
        identifier: 'open-longsword',
        phases: [
          {
            type: 'pool',
            name: 'Pools'
          },
          {
            type: 'elimination',
            name: 'Elimination'
          },
          {
            type: 'finals',
            name: 'Finals'
          }
        ]
      },
      {
        name: 'Sabre',
        identifier: 'sabre',
        phases: [
          {
            type: 'pool',
            name: 'Pools'
          },
          {
            type: 'elimination',
            name: 'Elimination'
          },
          {
            type: 'finals',
            name: 'Finals'
          }
        ]
      }
    ];

    tournaments.forEach(function(tournament) {
      Tournaments.insert(tournament);
    });
  }
});