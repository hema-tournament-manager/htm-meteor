var spawn = require('child_process').spawn;

// IS_MIRROR must be set or else the Velocity HTML thingamabob hides part of the page
var env = Object.create(process.env);
env.IS_MIRROR = '1';
var meteor = spawn('meteor', ['--release','velocity:METEOR@1.2.1_2'], {env: env});

// it's not a success until Chimp finishes without errors
var errorCode = 1;

function runChimp() {
  var chimp = spawn('chimp', ['--ddp=http://localhost:3000', '--path=tests/cucumber']);

  chimp.stdout.on('data', function(data) {
    console.log(('' + data).trim());
  });

  chimp.on('error', function(error) {
    console.error('[chimp:err] ' + error);
  });

  chimp.on('close', function(code, signal) {
    errorCode = code;
    console.log('Chimp finished (with code ' + code + '), killing Meteor');
    meteor.kill();
  });
};

meteor.stdout.on('data', function(data) {
  console.log(('[meteor] ' + data).trim());
  if (data.toString().match(/App running at: http:\/\/localhost:3000\//g)) {
    runChimp();
  }
});

meteor.on('error', function(error) {
  console.log('[meteor:err] ' + error);
});

// return exit code
process.on('exit', function() {
  process.exit(errorCode);
});