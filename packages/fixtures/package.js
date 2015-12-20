Package.describe({
  name: 'fixtures',
  version: '0.0.1',
  debugOnly: true,
  summary: 'Fixtures for Cucumber tests',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('fixtures.js');
});