angular.module('htm.battle-station', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap'
]);

angular.module('htm.battle-station').config(['$stateProvider', function($stateProvider) {
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
}]);