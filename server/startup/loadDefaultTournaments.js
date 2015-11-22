Meteor.startup(function() {

  if (Tournaments.find().count() === 0) {
    var tournaments = [
      {
        name: 'Authentic Grass Swords',
        identifier: 'authentic-grass-swords',
        phases: [
          {
            type: 'enrolled',
            name: 'Enrolled',
            participants: [],
            settings: {}
          }, {
            type: 'pool',
            name: 'Pools',
            participants: [],
            fights: {
              planned: [],
              scheduled: [],
              inProgress: [],
              finished: []
            },
            settings: {
              pools: ['A', 'B']
            }
          }, {
            type: 'elimination',
            name: 'Elimination',
            participants: [],
            fights: {
              planned: [],
              scheduled: [],
              inProgress: [],
              finished: []
            },
            settings: {}
          }, {
            type: 'finals',
            name: 'Finals',
            participants: [],
            fights: {
              planned: [],
              scheduled: [],
              inProgress: [],
              finished: []
            },
            settings: {}
          }]
      },
      {
        name: 'Finn Swords',
        identifier: 'finn-swords',
        phases: [
          {
            type: 'enrolled',
            name: 'Enrolled',
            participants: [],
            settings: {}
          }, 
          {
            type: 'pool',
            name: 'Pools',
            participants: [],
            fights: {
              planned: [],
              scheduled: [],
              inProgress: [],
              finished: []
            },
            settings: {
              pools: ['A', 'B']
            }
          },
          {
            type: 'elimination',
            name: 'Elimination',
            participants: [],
            fights: {
              planned: [],
              scheduled: [],
              inProgress: [],
              finished: []
            },
            settings: {}
          },
          {
            type: 'finals',
            name: 'Finals',
            participants: [],
            fights: {
              planned: [],
              scheduled: [],
              inProgress: [],
              finished: []
            },
            settings: {}
          }
        ]
      }
    ];

    tournaments.forEach(function(tournament) {
      Tournaments.insert(tournament);
    });
  }
});