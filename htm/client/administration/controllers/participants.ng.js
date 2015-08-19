
angular.module('htm.administration').controller('ParticipantsCtrl', ['$meteor',function($meteor) {
  
  this.list = $meteor.collection(Participants);

  this.add = function() {
    this.list.push({number: this.list.length + 1, name: 'Jogchem Dijkstra', country: {code: 'NL', name: 'Netherlands'}, club: {name: 'HTM'}});
  };


}]);

angular.module('htm.administration').controller('ParticipantsImportCtrl', 
  ['$scope', '$element','$window', '$meteor', '$state', 
  function ParticipantsImportController($scope, $element, $window, $meteor, $state) {
    
    this.hasFile = false;
   
    this.import = function() {
      var participants = this.participants;
      var coll = $meteor.collection(Participants);
      console.log(coll);
      participants.map(function(p) {
        return {
          name: p.name,
          club: {name: p.club},
          country: {code: p.country}
        };
      }).forEach(function(p) {
        coll.save(p);
      });
      coll.stop();
      $state.go('administration.participants');
    };

    var handleDragOver = function(jqe) {
      var e = jqe.originalEvent || jqe;
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    var self = this;
    var readParticpants = function(jqe) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        var wb = XLSX.read(data, {type: 'binary'});
        $scope.$apply(function() {
          self.hasFile = true;
          self.participants = wb.SheetNames.reduce(function(aggregator, sheet) {
            var rows = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet]);
            return aggregator.concat(rows.filter(function(p) {
              return p.Name;
            }).map(function(p) {
              return {
                name: p.Name,
                club: p.Club,
                country: p.Country,
                selected: true
              };
            }));
          },[]);
        });
      };

      var e = jqe.originalEvent || jqe;
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      var f = files[0];
      
      reader.readAsBinaryString(f);
    }
    
    var drop = $element.find('#drop');
    drop.bind('dragenter', handleDragOver);
    drop.bind('dragover', handleDragOver);
    drop.bind('drop', readParticpants);
}]);

