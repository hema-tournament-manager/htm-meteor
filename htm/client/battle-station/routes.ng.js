angular.module('htm.battle-station').config(function($stateProvider) {
  $stateProvider
    .state('battle-station', {
      url: '/battle-station',
      views: {
        '': {
          template: 'Battle Station'
        },
        'navigation': {
          templateUrl: 'client/battle-station/navigation.ng.html'
        }
      }
      
    });
});