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
      return this.server.call('reset');
    });

    // Given the Land of Ooo exists will call createTheLandOfOoo
    // Given Finn exists will call createFinn
    this.Given(/^(.*) exists$/, function (entity) {
      return this.server.call(camelize('create ' + entity));
    });


    this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
      return this.client.
        url(url.resolve(process.env.ROOT_URL, relativePath));
    });

    this.When(/^I click (button|link) "([^"]*)"$/, function (buttonOrLink, linkText) {
      return this.client.click((buttonOrLink === 'button' ? buttonOrLink : 'a') + '=' + linkText);
    });

    this.When(/^I click the ([^ ]*) icon$/, function (icon) {
      return this.client.click(".glyphicon-" + icon);
    });

    this.When(/^I click (.*) button$/, function (name) {
      return this.client.click("button[name=\"" + name + "\"]");
    });
    this.Then(/^I should see the title "([^"]*)"$/, function (expectedText) {
      return this.client
        .waitForVisible('h1,h2,h3,h4,h5,h6')
        .getText('*').should.eventually.match(new RegExp(expectedText, 'g'));
     
    });
    this.Then(/^I should not see the title "([^"]*)"$/, function (expectedText) {
      return this.client
        .waitForVisible('h1,h2,h3,h4,h5,h6')
        .getText('*').should.eventually.not.match(new RegExp(expectedText, 'g'));
    });

    this.Then(/^I should see the text "([^"]*)"$/, function (expectedText) {
      return this.client
        .waitForVisible('body')
        .getText('*').should.eventually.match(new RegExp(expectedText, 'g'));
     
    });
    this.Then(/^I should not see the text "([^"]*)"$/, function (expectedText) {
     return this.client
       .waitForVisible('body')
       .getText('*').should.eventually.not.match(new RegExp(expectedText, 'g'));
    });

    this.When(/^I enter the (.*): "([^"]*)"$/, function (field, value) {
      var element = "input[name=\""+field+"\"] ";
      return this.client.clearElement(element).setValue(element,value);
    });

    this.When(/^I select the (.*): "([^"]*)"$/, function (option, value) {
      return this.client
        .click("div[name=\""+option+"\"] .ui-select-match span")
        .click("span="+value);
    });

    this.When(/^I drag "[^"]*" and drop it on "[^"]*"$/, function (relativePath) {
      


      return this.client.
        url(url.resolve(process.env.ROOT_URL, relativePath));
    });

  };
 
})(); 