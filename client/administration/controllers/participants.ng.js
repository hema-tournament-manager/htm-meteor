
angular.module('htm.administration')
  .controller('ParticipantEditCtrl', function($scope, $meteor, $state, $stateParams) {

      this.cancel = function() {
        $state.go('^');
      };

      this.save = function() {
        if(this.isNew){
          $meteor.call('addParticipants', this.participant);  
        } 
        
        $state.go('^');
      };

      this.isNew = angular.isUndefined($stateParams.participantId);


      if(this.isNew){
        var emptyParticipant = {name: '', club: {}, country: {}};
        this.participant = emptyParticipant;
      } else {
        this.participant = $meteor.object(Participants, $stateParams.participantId);
      }

      this.countries = $scope.$meteorCollection(Countries,false);
      this.clubs = [{name:'HEMA Tournament Managers', code:'HTM'},{name:'Noorderwind', code:'NW'}]
});

angular.module('htm.administration')
  .controller('ParticipantsCtrl', function($scope, $meteor, $state) {
    
      this.list = $scope.$meteorCollection(Participants);
      
      this.add = function() {
        $state.go('administration.participants.add');
      };

      this.import = function(){
        $state.go('administration.participants.import');
      };

      this.edit = function(participant){
        $state.go('administration.participants.edit',{participantId:participant._id});
      };

      this.isEditorActive = function(participant){
        return $state.is('administration.participants.edit',{participantId:participant._id});
      }
});

angular.module('htm.administration')
  .controller('ParticipantsImportCtrl', function($scope, $element, $window, $meteor, $state) {
      
      this.hasFile = false;
     
      this.import = function() {
        var participants = this.participants;
        Meteor.call('addParticipants', participants.filter(function(p) {
          return p.selected;
        }).map(function(p) {
          return {
            name: p.name,
            club: {name: p.club},
            country: {code: p.country}
          };
        }));
        $state.go('^');
      };

      this.cancel = function(){
        $state.go('^');
      };

      var handleDragOver = function(jqe) {
        var e = jqe.originalEvent || jqe;
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      };

      var self = this;
      var readParticipants = function(jqe) {
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
      drop.bind('drop', readParticipants);
});

