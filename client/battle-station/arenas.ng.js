HtmBattleStation.controller('ArenasCtrl', function($scope, $reactive) {
  $reactive(this).attach($scope);
  this.helpers({
    arenas() {
      return Arenas.find();
    }
  });
  this.subscribe('arenas');
});