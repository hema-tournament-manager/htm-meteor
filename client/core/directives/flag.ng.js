angular.module('htm.core')
	.directive('htmFlag', function() {
		return {
			restrict: 'E',
			replace: true,
				scope: {
				country: '=',
				},
			templateUrl: 'client/core/directives/flag.ng.html'
		};
	})