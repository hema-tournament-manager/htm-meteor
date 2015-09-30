
angular.module('htm.administration')
  .controller('ParticipantEditCtrl', function($scope, $meteor, $state, $stateParams) {

      var self = this;

      this.closeEditor = function() {
        $state.go('^', {}, {ignoreDsr: true});
      };

      this.save = function() {

        if(this.isNew){
          //TODO: Handle exceptions
          this.participants.save(this.participant).then(function(){
            self.closeEditor();   
          });
        } else {
          self.closeEditor();
        }
      };

      this.addNewClub = function(){
        this.newClub = true;
        this.oldClub = this.participant.club;
        this.participant.club = {name: '', code: ''};
      }

      this.removeNewClub = function(){
        this.newClub = false;
        this.participant.club = this.oldClub;
      }

      this.canRemoveNewClub = function(){
        return !_.isEmpty(this.clubs)
      }

      this.participants = $meteor.collection(Participants);

      this.tournaments = [];
      $scope.$meteorSubscribe('tournaments').then(function(){
        self.tournaments = $scope.$meteorCollection(Tournaments);
      });

      this.countries = [];
      $scope.$meteorSubscribe('countries').then(function(){
        self.countries = $scope.$meteorCollection(Countries,false);
      });

      this.clubs = [];
      this.newClub = true;
      $scope.$meteorSubscribe('clubs').then(function(){
        self.clubs = $scope.$meteorCollection(Clubs,false);
        self.newClub = _.isEmpty(self.clubs);
      });

      this.isNew = angular.isUndefined($stateParams.participantId);

      if(this.isNew){
        this.participant = Participants._transform({name: '', club: {name: '', code: ''}, country: undefined, tournaments : []});
      } else {
        this.participant = $scope.$meteorObject(Participants, $stateParams.participantId);
      }

      this.toggleSubscription = function(tournament) {
        if(this.participant.inTournament(tournament)){
          this.participant.tournaments = _.without(this.participant.tournaments, tournament._id);
        } else {
          this.participant.tournaments.push(tournament._id);  
        }
      };
});

angular.module('htm.administration')
  .controller('ParticipantsCtrl', function($scope, $meteor, $state, tournamentId) {
      var self = this;
          
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
      };
      this.isParticipantsActive = function(){
        return $state.is('administration.participants');
      };


      this.tournaments = $scope.$meteorCollection(Tournaments);
      this.tournaments.subscribe('tournaments');

      this.query = {q : '' };
      var options = {sort: { number : -1 }}; //TODO: Make these toggable.
      $scope.$meteorSubscribe('participants', {}, options).then(function(subscriptionHandle){
        //TODO: This clears the list, shouldn't clear list untill new list has been fetched
        self.list = $scope.$meteorCollection(function() {
          var query = $scope.getReactively('participants.query.q');
          var q = { $or: [ 
            {'name': { $regex:query, $options: 'i'}},
            {'number': { $regex:query, $options: 'i'}},
            {'club.name': { $regex:query, $options: 'i'}},
            {'club.code': { $regex:query, $options: 'i'}},
            {'country.code2': { $regex:query, $options: 'i'}},
            {'country.name': { $regex:query, $options: 'i'}},
          ]};
          if (tournamentId) {
            q.tournaments = tournamentId;
          }
          console.log('query', q);
          return Participants.find(q, options);
        });
      });
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
            club: p.club,
            country: p.country
          };
        }));
        $state.go('^', {}, {ignoreDsr: true});
      };

      this.cancel = function(){
        $state.go('^', {}, {ignoreDsr: true});
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
                  club: {name: p.Club, code: p.Code},
                  country: {code2: p.Country},
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

