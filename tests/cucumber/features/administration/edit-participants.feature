Feature: Manage the administration of participants

  As a tournament administrator
  I want to be able to edit participants
  So that I can manage the administration of participants

  Background:
    Given I am a new user
    
    Given the Land of Ooo exists
    When I navigate to "/administration/participants"
    Then I should see the title "Participants"

  Scenario: Close edit participant
    Given Finn exists
    Then I should see the entry "Finn"

    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I click button "Done"
    Then I should not see the title "Edit Participant" 

  Scenario: Change Finn's club to a new club Marceline's House
    Given Finn exists
    Then I should see the entry "Finn"

    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I click add club button
    Then I should see the label "Club"
     And I should see the label "Club Code"
     And I enter the club name: "Marceline's House"
     And I enter the club code: "Marceline's House"
    
    When I click button "Done"
    Then I should not see the title "Edit Participant" 
     And I should see the entry "Marceline's House"

  Scenario: Change Finn's club to the existing club The Candy Castle
    Given Finn exists
     And The Candy Castle exists
    Then I should see the entry "Finn"

    When I click the wrench icon
    Then I should see the title "Edit Participant"
    When I select the club: "The Candy Castle"
     And I click button "Done"
    Then I should not see the title "Edit Participant" 
     And I should see the entry "The Candy Castle"

  Scenario: Change Finn's name to Fiona
    Given Finn exists
    Then I should see the entry "Finn"
   
    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I enter the name: "Fiona"
     And I click button "Done"
    Then I should not see the title "Edit Participant" 
     And I should see the entry "Fiona"
     But I should not see the entry "Finn" 

  Scenario: Change Finn's country to the Land of Ooo
    Given Finn exists
    Then I should see the entry "Finn"

    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I select the country: "Land of Ooo"
     And I click button "Done"
    Then I should see the entry "IO" 
     But I should not see the entry "TF"     