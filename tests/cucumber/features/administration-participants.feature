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
    When I navigate to "/administration/participants/import"
    Then I should see the text "Import from Excel"

  @dev
  Scenario: Add participant
    When I navigate to "/administration/participants"
    And I click button "Add"
    Then I should see the text "Add Participant"
