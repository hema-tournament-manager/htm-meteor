Meteor.startup(function() {

  if (Tournaments.find().count() === 0) {
    var tournaments = [
      {
        name: 'Open Longsword',
        identifier: 'open-longsword',
        phases: [
          {
            type: 'enrolled',
            name: 'Enrolled',
            participants: [],
            fights: [],
            settings: {}
          }, {
            type: 'pool',
            name: 'Pools',
            participants: [],
            fights: [],
            settings: {
              pools: ['A', 'B']
            }
          }, {
            type: 'elimination',
            name: 'Elimination'
          }, {
            type: 'finals',
            name: 'Finals'
          }]
      },
      {
        name: 'Sabre',
        identifier: 'sabre',
        phases: [
          {
            type: 'enrolled',
            name: 'Enrolled',
            participants: [],
            fights: [],
            settings: {}
          }, 
          {
            type: 'pool',
            name: 'Pools',
            settings: {
              pools: ['A']
            }
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