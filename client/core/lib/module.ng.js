var core = angular.module('htm.core', []);


core.filter('highlight', function($sce) {
  return function(text, phrase) {
    if (phrase && text) {
      text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="highlighted">$1</span>');
    }

    return $sce.trustAsHtml(text)
  }
});

core.filter('toArray', function () {
  return function (obj) {
    if (angular.isObject(obj)) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return obj;
    }
  };
});;

