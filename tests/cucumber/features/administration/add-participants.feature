Feature: Add participants

  As a tournament administrator
  I want to be able to add participants
  So that I can manage the administration of participants

  Background:
    Given I am a new user
    
    Given the Land of Ooo exists
    When I navigate to "/administration/participants"
    Then I should see the title "Participants"
    
  Scenario: Close add participant
    When I click button "Add"
    Then I should see the title "Add Participant"
     And I click button "Close"

  Scenario: Add Finn and Jake (withouth club or country)
    When I click button "Add"
    Then I should see the title "Add Participant"
     And I should see the label "Club"
     And I should see the label "Club Code"

    When I enter the name: "Finn"
     And I click button "Add Participant"
    Then I should see the entry "Finn"

    When I click button "Add"
    Then I should see the title "Add Participant"
     And I should see the label "Club"
     And I should see the label "Club Code"
  
    When I enter the name: "Jake"
     And I click button "Add Participant"
    Then I should see the entry "Jake"

  Scenario: Add Finn from the new Club Tree Fort from the Candy Kingdom
    When I click button "Add"
    Then I should see the title "Add Participant"
     And I should see the label "Club"
     And I should see the label "Club Code"

    When I enter the name: "Finn"
     And I enter the club name: "Tree Fort"
     And I enter the club code: "TF"
     And I select the country: "Candy Kingdom"
     And I click button "Add Participant"
    Then I should see the entry "Finn"
     And I should see the entry "Tree Fort"
     And I should see the entry "CK"

  Scenario: Add Jake from the existing club Tree Fort from The Land of Ooo
    Given Finn exists

    When I click button "Add"
    Then I should see the title "Add Participant"
     And I should see the label "Club"
     And I should not see the label "Club Code"

    When I enter the name: "Jake"
     And I select the club: "Tree Fort"
     And I select the country: "Land of Ooo"
     And I click button "Add Participant"
    Then I should see the entry "Jake"
     And I should see the entry "Tree Fort"
     And I should see the entry "IO"
