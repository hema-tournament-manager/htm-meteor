Feature: Search the administration of participants

  As a tournament administrator
  I want to be able to search participants
  So that I can manage the administration of participants

  Background:
    Given I am a new user
    
    Given the Land of Ooo exists
    When I navigate to "/administration/participants"
    Then I should see the title "Participants"

  Scenario: Search participants by their name
    Given Finn exists
     And Jake exists
     And Marceline exists
     And Princess Bubblegum exists

    When I enter the query: "Marceline"
    Then I should see the entry "Marceline"
     But I should not see the entry "Finn" 
     But I should not see the entry "Jake" 
     But I should not see the entry "Princess Bubblegum" 
    
    When I enter the query: "Finn"
    Then I should see the entry "Finn"
     But I should not see the entry "Marceline" 
     And I should not see the entry "Jake" 
     And I should not see the entry "Princess Bubblegum" 
   
    When I enter the query: ""
    Then I should see the entry "Finn"
     And I should see the entry "Marceline" 
     And I should see the entry "Jake" 
     And I should see the entry "Princess Bubblegum" 

  Scenario: Search participants by their club
    Given Finn exists
     And Jake exists
     And Marceline exists
     And Princess Bubblegum exists

    When I enter the query: "Marceline"
    Then I should see the entry "Marceline"
     But I should not see the entry "Finn" 
     But I should not see the entry "Jake" 
     But I should not see the entry "Princess Bubblegum" 
   
    When I enter the query: "Finn"
    Then I should see the entry "Finn"
     But I should not see the entry "Marceline" 
     And I should not see the entry "Jake" 
     And I should not see the entry "Princess Bubblegum" 
    
    When I enter the query: ""
    Then I should see the entry "Finn"
     And I should see the entry "Marceline" 
     And I should see the entry "Jake" 
     And I should see the entry "Princess Bubblegum"

