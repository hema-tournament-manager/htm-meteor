(function () {

	'use strict';

	var _ = require('underscore');

	function toId(str) {
		return str.replace(/\s+/,'-');
	}

	module.exports = function () {

		var url = require('url');

		 // For battle-station buttons
		this.When(/^I select (.*)$/, function (scoreType) {
			this.client.click(toId('#' + scoreType));
		});

		this.When(/^I select (.*) for (red|blue)$/, function (scoreType, side) {
			this.client.click(toId('#' + side + '-' + scoreType));
		});
		
		this.When(/^I select (.*) for (red|blue) for (.*) points$/, function (scoreType, side, points) {
			this.client.click(toId('#' + side + '-' + scoreType));
			this.client.waitForVisible(toId('#' + side + '-' + scoreType + '-' + points));
			this.client.click(toId('#' + side + '-' + scoreType + '-' + points));
		});

		this.When(/^I select (.*) for (red|blue) for (.*) points, (red|blue) (.*) points$/, 
			function (scoreType, side, points, side2, points2) {
			this.client.click(toId('#' + side + '-' + scoreType));
			this.client.waitForVisible(toId('#' + side + '-' + scoreType + '-' + points));
			this.client.click(toId('#' + side + '-' + scoreType + '-' + points));
			this.client.waitForVisible(toId('#' + side + '-' + scoreType + '-' + points2));
			this.client.click(toId('#' + side + '-' + scoreType + '-' + points2));

		});    

		this.Then(/^I should see the (.*) "([^"]*)"$/, function (id,expectedText) {
			this.client.waitForVisible(toId('#' + id));
			expect(this.client.getText(toId('#' + id))).toMatch(new RegExp(expectedText, 'g'));
		 
		});
		
		this.Then(/^the (undo|redo) button should be (enabled|disabled)$/, function (id,expectedState) {
			this.client.waitForVisible(toId('#' + id));
			if(expectedState === 'enabled'){
				expect(this.client.getAttribute(toId('#' + id),'class')).not.toMatch('disabled'); 	
			} else {
				expect(this.client.getAttribute(toId('#' + id),'class')).toMatch('disabled'); 	
			}
			
		});


	};
 
})(); 