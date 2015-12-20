HtmAdministration.controller('ParticipantEditCtrl', function($scope, $reactive, $state, $stateParams) {
      $reactive(this).attach($scope);

      var self = this;

      this.closeEditor = function() {
        $state.go('^', {}, {ignoreDsr: true});
      };

      this.save = function() {

        if(self.isNew) {
          Participants.insert(angular.copy(self.participant), function(error, result) {
            if (error) {
              //TODO: Handle exceptions
            } else {
              self.closeEditor();   
            }
          });
        } else {
          Participants.update(self.participant._id, angular.copy(self.participant), function(error, result) {
            if (error) {
              //TODO: Handle exceptions
            } else {
              self.closeEditor();   
            }
            });
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

      this.helpers({
        participants() {
          return Participants.find();
        },
        tournaments() {
          return Tournaments.find();
        },
        countries() {
          return Countries.find();
        },
        clubs() {
          return Clubs.find();
        },
        newClub() {
          return _.isEmpty(self.clubs);
        },
        isNew: angular.isUndefined($stateParams.participantId),
        participant() {
          if(this.isNew){
            return Participants._transform({name: '', club: {name: '', code: ''}, country: undefined, tournaments : []});
          } else {
            return Participants.findOne($stateParams.participantId);
          }
        }

      });

      this.subscribe('tournaments');
      this.subscribe('countries');
      this.subscribe('clubs');

      this.toggleSubscription = function(tournament) {
        if(this.participant.inTournament(tournament)) {
          Meteor.call('withdrawParticipantFromTournament', this.participant._id, tournament._id);
        } else {
          Meteor.call('enrollParticipantInTournament', this.participant._id, tournament._id);
        }
      };
});

HtmAdministration.controller('ParticipantsCtrl', function($scope, $reactive, $state) {
  $reactive(this).attach($scope);

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

  this.helpers({
    tournaments() {
      return Tournaments.find();
    },
    query: {q : '' },
    options: {sort: { number : -1 }},
    list() {
      var query = self.query.q;
      var q = { $or: [ 
        {'name': { $regex:query, $options: 'i'}},
        {'number': { $regex:query, $options: 'i'}},
        {'club.name': { $regex:query, $options: 'i'}},
        {'club.code': { $regex:query, $options: 'i'}},
        {'country.code2': { $regex:query, $options: 'i'}},
        {'country.name': { $regex:query, $options: 'i'}},
      ]};
      return Participants.find(q, self.options);
    }
  });
  this.subscribe('participants');
  this.subscribe('tournaments');
});

HtmAdministration.controller('ParticipantsImportCtrl', function($scope, $element, $window, $state) {
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

