@focus
Feature: Register hits

  As a jury member
  I want to be able to register the hits called out by the judge
  So that I can tally the scores of a fight


  Background:
    Given I am a new user
    
    Given the Land of Ooo exists
    Given Finn exists
    Given Jake exists

    When I navigate to "/battle-station"
    Then I should see the score red "0"
    Then I should see the score blue "0"


  Scenario: Add double hit 
  	When I select double hit
    Then I should see the score-red "0"
    Then I should see the score-blue "0" 


  Scenario: Add single hit red
  	When I select clean hit for red for 3 points
    Then I should see the score red "3"
    Then I should see the score blue "0" 
