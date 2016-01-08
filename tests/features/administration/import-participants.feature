Feature: Import participants

  As a tournament administrator
  I want to be able to import participants from excel
  So that I can manage the administration of participants

  Background:
    Given I am a new user
    
    Given the Land of Ooo exists
    When I navigate to "/administration/participants"
    Then I should see the title "Participants"

  Scenario: Navigate to import screen
    When I click button "Upload"
    Then I should see the title "Import from Excel"
    When I click button "Close"
    Then I should not see the title "Import from Excel"    