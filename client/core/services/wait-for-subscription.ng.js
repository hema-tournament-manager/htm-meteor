HtmCore.factory('waitForSubscription', function($q) {
  return function(name, ...args) {
    var deferred = $q.defer();
    
    Meteor.subscribe(name, ...args, {
      onReady: deferred.resolve,
      onStop: deferred.reject
    });

    return deferred.promise;
  };
});