angular.module('htm.core', []);


angular.module('htm.core')
	  .filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase && text) {
      	text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="highlighted">$1</span>');
      }

      return $sce.trustAsHtml(text)
    }
  });
