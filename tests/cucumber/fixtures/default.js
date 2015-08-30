(function () {

  'use strict';

  Meteor.methods({
    'reset': function() {
      Participants.remove({});
      Tournaments.remove({});
      Clubs.remove({});

    }
  });

})();