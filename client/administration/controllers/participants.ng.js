
angular.module('htm.administration')
	.controller('ParticipantEditCtrl', function($scope, $meteor, $state, $stateParams) {

			this.cancel = function() {
				$state.go('^', {}, {ignoreDsr: true});
			};

			this.save = function() {


				if(this.isNew){
					$meteor.call('addParticipants', angular.copy(this.participant));  
				} 
				
				$state.go('^', {}, {ignoreDsr: true});
			};

			this.addNewClubVisible = false;

			this.showAddNewClub = function(){
				this.addNewClubVisible = true;
			}

			this.hideAddNewClub = function(){
				this.addNewClubVisible = false;
			}

			this.country = function(participant){
				return _.findWhere(this.countries, {_id: participant._countryId});
			}
			this.club = function(participant){
				return _.findWhere(this.clubs, {_id: participant._clubId});
			}

			this.participants = $meteor.collection(Participants);

			this.countries = $scope.$meteorCollection(Countries,false);
			this.countries.subscribe('countries');

			this.clubs = $scope.$meteorCollection(Clubs,false);
			this.clubs.subscribe('clubs');

			this.isNew = angular.isUndefined($stateParams.participantId);
			if(this.isNew){
				this.participant = {name: '', _clubId: undefined, _countryId: undefined};
			} else {
				this.participant = $scope.$meteorObject(Participants, $stateParams.participantId);
			}

			this.dropIn = function(tournament) {
				if (!this.participant.tournaments) {
					this.participant.tournaments = [];
				}
				if (tournament && tournament._id) {
					this.participant.tournaments.push(tournament._id);
				}
			};

			this.dropOut = function(tournament) {
				if (this.participant.tournaments && tournament && tournament._id) {
					this.participant.tournaments = _.without(this.participant.tournaments, tournament._id);
				}
			};
});

angular.module('htm.administration')
	.controller('ParticipantsCtrl', function($scope, $meteor, $state) {
					
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

			this.tournaments = $scope.$meteorCollection(Tournaments);

			this.country = function(participant){
				return _.findWhere(this.countries,{_id: participant._countryId});
			}
			this.club = function(participant){
				return _.findWhere(this.clubs, {_id: participant._clubId});
			}

			this.countries = $scope.$meteorCollection(Countries,false);
			this.countries.subscribe('countries');

			this.clubs = $scope.$meteorCollection(Clubs,false);
			this.clubs.subscribe('clubs');

			this.query = {q : '' };
			this.list = $scope.$meteorCollection(Participants);
			$scope.$meteorAutorun(function() {
				var q = $scope.getReactively('participants.query.q');
				$scope.$meteorSubscribe('participantsSearch', q || '');
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
						club: {name: p.club},
						country: {code: p.country}
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

