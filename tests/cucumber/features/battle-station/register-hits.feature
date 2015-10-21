@focus
Feature: Register hits

	As a jury member
	I want to be able to register the hits called out by the judge
	So that I can tally the scores of a fight

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

	Scenario: Add double hit 
		When I select double hit
		Then I should see the score red "0"
		 And I should see the score blue "0" 
		 And I should see the score neutral "1"

	Scenario: Add no hit 
		When I select no hit
		Then I should see the score red "0"
		 And I should see the score blue "0" 
		 And I should see the score neutral "1"

	Scenario: Add clean hit red for 1 points
		When I select clean hit for red for 1 points
		Then I should see the score red "1"
		 And I should see the score blue "0" 
		 And I should see the score neutral "1" 

	Scenario: Add clean hit red for 2 points
		When I select clean hit for red for 2 points
		Then I should see the score red "2"
		 And I should see the score blue "0" 
		 And I should see the score neutral "1"      

	Scenario: Add clean hit red for 3 points
		When I select clean hit for red for 3 points
		Then I should see the score red "3"
		 And I should see the score blue "0" 
		 And I should see the score neutral "1" 

	Scenario: Add clean hit blue for 1 points
		When I select clean hit for blue for 1 points
		Then I should see the score red "0"
		 And I should see the score blue "1" 
		 And I should see the score neutral "1" 

	Scenario: Add clean hit blue for 2 points
		When I select clean hit for blue for 2 points
		Then I should see the score red "0"
		 And I should see the score blue "2" 
		 And I should see the score neutral "1"      

	Scenario: Add clean hit blue for 3 points
		When I select clean hit for blue for 3 points
		Then I should see the score red "0"
		 And I should see the score blue "3" 
		 And I should see the score neutral "1"      

	Scenario: Add after blow red for 1 points, blue 1 points
		When I select after blow for red for 1 points, blue 1 points
		 And I should see the score red "1"
		 And I should see the score blue "1" 
		 And I should see the score neutral "1"   

	Scenario: Add after blow red for 1 points, blue 2 points
		When I select after blow for red for 1 points, blue 2 points
		 And I should see the score red "1"
		 And I should see the score blue "2" 
		 And I should see the score neutral "1"   

	Scenario: Add after blow red for 2 points, blue 1 points
		When I select after blow for red for 2 points, blue 1 points
		 And I should see the score red "2"
		 And I should see the score blue "1" 
		 And I should see the score neutral "1"   

	Scenario: Add after blow red for 2 points, blue 2 points
		When I select after blow for red for 2 points, blue 2 points
		 And I should see the score red "2"
		 And I should see the score blue "2" 
		 And I should see the score neutral "1"

	Scenario: Add after blow red for 3 points, blue 1 points
		When I select after blow for red for 3 points, blue 1 points
		 And I should see the score red "3"
		 And I should see the score blue "1" 
		 And I should see the score neutral "1"   

	Scenario: Add after blow red for 3 points, blue 2 points
		When I select after blow for red for 3 points, blue 2 points
		 And I should see the score red "3"
		 And I should see the score blue "2" 
		 And I should see the score neutral "1"           