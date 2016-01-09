#!/usr/bin/env node
var path = require('path'),
   extend = require('util')._extend,
   exec = require('child_process').exec;

var baseDir = path.resolve(__dirname, '..'),
    srcDir = baseDir,
    velocityBin = path.resolve(baseDir, 'node_modules/.bin/velocity'),
    chimpScript = path.resolve(__dirname, 'start.js');

runTests();

function runTests() {
  // runVelocity(function () {
    runChimp(function () {
      console.log('Yay!');
    });
  // });
}

function runVelocity(callback) {
  startProcess({
    name: 'Velocity',
    options: {
      cwd: srcDir
    },
    command: velocityBin + ' test-app --ci'
  }, callback);
}

function runChimp(callback) {
  startProcess({
    name: 'Chimp',
    options: {
      env: extend({CI: 1}, process.env)
    },
    command: chimpScript
  }, callback);
}

function startProcess(opts, callback) {

  var proc = exec(
     opts.command,
     opts.options
  );
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  proc.on('close', function (code) {
    if (code > 0) {
      console.log(opts.name, 'exited with code ' + code);
      process.exit(code);
    } else {
      callback();
    }
  });
}