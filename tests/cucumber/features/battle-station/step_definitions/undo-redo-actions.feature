Feature: Undo and redo battlestation actions

	As a jury member
	I want to be able to undo and redo actions in the battle-station
	So that I can correct errors made while talling the scores in a fight

	This tests a dummy rule set. 

	Background:
		Given I am a new user
		
		Given the Land of Ooo exists
		Given Finn exists
		Given Jake exists

		When I navigate to "/battle-station"
		Then I should see the score red "0"
		 And I should see the score blue "0"
		 And I should see the score neutral "0"
		 And the undo button should be disabled
		 And the redo button should be disabled

	Scenario: Undo a single simple action:
		When I select no hit
		Then I should see the score neutral "1"
		And the undo button should be enabled
		When I select undo
		Then I should see the score neutral "0"
		And the undo button should be disabled
		And the redo button should be enabled

	Scenario: Undo the second simple action:
		When I select no hit
		Then I should see the score neutral "1"
		When I select no hit
		Then I should see the score neutral "2"
		When I select undo
		Then I should see the score neutral "1"
		And the undo button should be enabled
		And the redo button should be enabled

	Scenario: Undo a single action while a 2-step action is active:
		When I select no hit
		Then I should see the score neutral "1"
		When I select after blow for red for 1 points
		Then the undo button should be disabled
		 And the redo button should be disabled