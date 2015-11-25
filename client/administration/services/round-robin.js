angular.module('htm.administration').factory('roundRobin', function() {
  var roundRobinPairing = function(nrOfPeople, iteration) {
    var pin = 1;
    var rows = rotate(topRowForCount(nrOfPeople), bottomRowForCount(nrOfPeople), iteration);
    var topRow = rows[0];
    var bottomRow = rows[1];
    var result = _([pin].concat(topRow)).zip(_(bottomRow).reverse());

    if (nrOfPeople == 5 && (iteration == 3 || iteration == 4)) {
      // dirty hack to guarantee that people won't fight twice in a row
      return _(result).reverse();
    } else {
      return result;
    }
  };

  var topRowForCount = function(nrOfPeople) {
    return _.range(2, Math.floor((nrOfPeople + 1) / 2) + 1);
  }

  var bottomRowForCount = function(nrOfPeople) {
    return _.range(Math.floor((nrOfPeople + 1) / 2) + 1, nrOfPeople + 1).concat(nrOfPeople % 2 == 1 ? [-1] : []);
  };

  var rotate = function(topRow, bottomRow, iterations) {
    if (iterations < 1) {
      return [topRow, bottomRow];
    } else {
      return rotate(
        [_(bottomRow).last()].concat(_.initial(topRow)),
        [_(topRow).last()].concat(_.initial(bottomRow)),
        iterations - 1
      );
    }
  };

  return function(nrOfPeople) {
    var maxNumberOfRounds = nrOfPeople - (nrOfPeople % 2 == 0 ? 1 : 0);
    return _(_.range(0, maxNumberOfRounds)
      .map(function(i) { return roundRobinPairing(nrOfPeople, i); })
    ).flatten(true)
      .filter(function(pairing) {
        return pairing[0] !== -1 && pairing[1] !== -1;
      });
  };
});