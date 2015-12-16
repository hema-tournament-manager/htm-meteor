HtmBattleStation.controller('ScheduledFightsCtrl', function($scope, $reactive, $stateParams) {
  $reactive(this).attach($scope);

  var self = this;

  this.helpers({
    arenaIdentifier() {
      if($stateParams.arenaId){
        return $stateParams.arenaId;  
      } else {
        return Arenas.findOne().identifier;
      }
    },
    tournaments() {
      return Tournaments.find();
    },
    participants() {
      return Participants.find();
    }
  });

  self.participant = function(fighterId) {
    return _.findWhere(self.participants, {_id:fighterId});
  }
});