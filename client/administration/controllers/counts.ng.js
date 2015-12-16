HtmAdministration.controller('CountsCtrl', function($scope, $reactive) {
  $reactive(this).attach($scope);
  this.helpers({
    participants() {
      return Counts.get('participants-count');
    },
    tournaments() {
      return Counts.get('tournaments-count');
    }
  });

  this.subscribe('counts');
});