(function () {

  'use strict';

  var _ = require('underscore');

  function camelize(str) {
   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  module.exports = function () {

    var url = require('url');

    this.Given(/^I am a new user$/, function () {
      server.call('reset');
    });

    // Given the Land of Ooo exists will call createTheLandOfOoo
    // Given Finn exists will call createFinn
    this.Given(/^(.*) exists$/, function (entity) {
      server.call(camelize('create ' + entity));
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
      client.url(url.resolve(process.env.ROOT_URL, relativePath));
    });

    // For buttons w/ a title
    this.When(/^I click (button|link) "([^"]*)"$/, function (buttonOrLink, linkText) {
      client.click((buttonOrLink === 'button' ? buttonOrLink : 'a') + '=' + linkText);
    });

    // For buttons with a name w/o a title or icon
    this.When(/^I click (.*) button$/, function (name) {
      client.click("button[name=\"" + name + "\"]");
    });
    
    // For buttons with an icon w/o a title or name
    this.When(/^I click the ([^ ]*) icon$/, function (icon) {
      client.click(".glyphicon-" + icon);
    });

    this.Then(/^I should see the title "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('h1,h2,h3,h4,h5,h6');
      expect(client.getText('h1,h2,h3,h4,h5,h6')).toMatch(new RegExp(expectedText, 'g'));     
    });

    this.Then(/^I should not see the title "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('h1,h2,h3,h4,h5,h6');
      expect(client.getText('h1,h2,h3,h4,h5,h6')).not.toMatch(new RegExp(expectedText, 'g'));
    });

    this.Then(/^I should see the entry "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('td');
      expect(client.getText('td')).toMatch(new RegExp(expectedText, 'g'));
    });

    this.Then(/^I should not see the entry "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('td');
      expect(client.getText('td')).not.toMatch(new RegExp(expectedText, 'g'));
    });

    this.Then(/^I should see the label "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('label');
      expect(client.getText('label')).toMatch(new RegExp(expectedText, 'g'));
    });
    this.Then(/^I should not see the label "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('label');
      expect(client.getText('label')).not.toMatch(new RegExp(expectedText, 'g'));
    });

    this.Then(/^I should see the text "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('body');
      expect(client.getText('body')).toMatch(new RegExp(expectedText, 'g'));
     
    });
    this.Then(/^I should not see the text "([^"]*)"$/, function (expectedText) {
      client.waitForVisible('body');
      expect(client.getText('body')).not.toMatch(new RegExp(expectedText, 'g'));
    });

    this.When(/^I enter the (.*): "([^"]*)"$/, function (field, value) {
      var element = "input[name=\""+field+"\"] ";
      client.clearElement(element);
      client.setValue(element,value);
    });

    this.When(/^I select the (.*): "([^"]*)"$/, function (option, value) {
      client.click("div[name=\""+option+"\"] .ui-select-match span");
      client.click("span="+value);
    });

  };
 
})(); 