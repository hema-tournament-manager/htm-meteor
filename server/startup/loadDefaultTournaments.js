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
            fights: {
              planned: [],
              scheduled: [],
              inProgress: [],
              finished: []
            },
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
        name: 'Sabre',
        identifier: 'sabre',
        phases: [
          {
            type: 'enrolled',
            name: 'Enrolled',
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