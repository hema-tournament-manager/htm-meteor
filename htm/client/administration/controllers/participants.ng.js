angular.module('htm.administration').controller('ParticipantsCtrl', ParticipantsController);

function ParticipantsController($meteor) {
  this.list = $meteor.collection(Participants);
}

ParticipantsController.prototype.add = function() {
  this.list.push({number: this.list.length + 1, name: 'Jogchem Dijkstra', country: {code: 'NL', name: 'Netherlands'}, club: {name: 'HTM'}});
};