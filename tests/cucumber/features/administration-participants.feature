Feature: Participants administration

  As a [role]
  I want [feature]
  So that [benefit]

  The story above is to set context for the reader. It doesn't actually have any impact on the test
  itself. The phrases inside the scenarios are ties to test code using regex, which you can see in
  /tests/features/step_definitions/steps.js

  In this textual part of the file, you can include context about this feature, you can add links to
  external documents and whatever is needed to create the full specification.

  # The background will be run for every scenario
  Background:
    Given I am a new user

  @dev
  Scenario: Navigate to import screen
    When I navigate to "/administration/participants"
    Then I should see the text "Participants"
    And I click button "Upload"
    Then I should see the text "Import from Excel"
    And I click button "Close"

  @dev
  Scenario: Close add participant
    When I navigate to "/administration/participants"
    Then I should see the text "Participants"
    And I click button "Add"
    Then I should see the text "Add Participant"
    And I click button "Close"
    
  @dev
  Scenario: Add Finn from the new Club Tree House from The Land of Ooo
    When I navigate to "/administration/participants"
    Then I should see the text "Participants"
    When I click button "Add"
    Then I should see the text "Add Participant"
    When I enter the name: "Finn"
    And I enter the club name: "Tree House"
    And I enter the club code: "TH"
    And I click button "Add Participant"
    Then I should see the text "Finn"
    And I should see the text "Tree House"


  @dev
  Scenario: Add Jake from the existing club Tree House from The Land of Ooo

  @dev
  Scenario: Change Finn's club to a new club Candy Kingdom 

  @dev
  Scenario: Change Finn's club to the existing club Nightosphere

  @dev
  Scenario: Change Finn's name to Fiona

  @dev
  Scenario: Change Finn's country to the Land of Aaa




