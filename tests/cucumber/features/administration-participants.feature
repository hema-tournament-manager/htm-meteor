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
    
    Given the Land of Ooo exists
    When I navigate to "/administration/participants"
    Then I should see the title "Participants"

  @dev
  Scenario: Navigate to import screen
    When I click button "Upload"
    Then I should see the title "Import from Excel"
    When I click button "Close"
    Then I should not see the title "Import from Excel"


  #@dev TODO: Fix drag and drop simulation
  Scenario: Import participants from file
    When I click button "Upload"
    Then I should see the title "Import from Excel"
    
    When I drag "participants.xslt" and drop it on "target"
    Then I should see the text "Finn"
     And I should see the text "Jake"
     And I should see the text "Marceline"
     And I should see the text "Princess Bubblegum"
    
    When I click the button "Import Participants"
    Then I should not see the title "Import from Excel"
     And I should see the text "Finn"
     And I should see the text "Jake"
     And I should see the text "Marceline"
     And I should see the text "Princess Bubblegum"      

  @dev
  Scenario: Close add participant
    When I click button "Add"
    Then I should see the title "Add Participant"
     And I click button "Close"
    
  @dev
  Scenario: Add Finn from the new Club Tree Fort from the Candy Kingdom
    When I click button "Add"
    Then I should see the title "Add Participant"
    
    When I enter the name: "Finn"
     And I enter the club name: "Tree Fort"
     And I enter the club code: "TF"
     And I select the country: "Candy Kingdom"
     And I click button "Add Participant"
    Then I should see the text "Finn"
     And I should see the text "Tree Fort"
     And I should see the text "CK"

  @dev
  Scenario: Add Jake from the existing club Tree Fort from The Land of Ooo
    Given Finn exists
    
    When I click button "Add"
    Then I should see the title "Add Participant"
    
    When I enter the name: "Jake"
     And I select the club: "Tree Fort"
     And I select the country: "Land of Ooo"
     And I click button "Add Participant"
    Then I should see the text "Jake"
     And I should see the text "Tree Fort"
     And I should see the text "IO"


  @dev
  Scenario: Close edit participant
    Given Finn exists
    
    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I click button "Done"
    Then I should not see the text "Edit Participant" 

  @dev
  Scenario: Change Finn's club to a new club Marceline's House
    Given Finn exists
    
    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I click add club button
    Then I should see the text "Club"
     And I should see the text "Club Code"
     And I enter the club name: "Marceline's House"
     And I enter the club code: "Marceline's House"
    
    When I click button "Done"
    Then I should not see the title "Edit Participant" 
     And I should see the text "Marceline's House"

  @dev
  Scenario: Change Finn's club to the existing club The Candy Castle
    Given Finn exists
    Given The Candy Castle exists
    
    When I click the wrench icon
    Then I should see the title "Edit Participant"
    When I select the club: "The Candy Castle"
     And I click button "Done"
    Then I should not see the title "Edit Participant" 
     And I should see the text "The Candy Castle"

  @dev
  Scenario: Change Finn's name to Fiona
    Given Finn exists
    
    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I enter the name: "Fiona"
     And I click button "Done"
    Then I should not see the title "Edit Participant" 
     And I should see the text "Fiona"
     But I should not see the text "Finn" 
    

  @dev
  Scenario: Change Finn's country to the Land of Ooo
    Given Finn exists
    
    When I click the wrench icon
    Then I should see the title "Edit Participant"
    
    When I select the country: "Land of Ooo"
     And I click button "Done"
    Then I should see the text "IO" 
     But I should not see the text "TF" 


  @dev
  Scenario: Search participants by their name
    Given Finn exists
     And Jake exists
     And Marceline exists
     And Princess Bubblegum exists

    When I enter the query: "Marceline"
    Then I should see the text "Marceline"
     But I should not see the text "Finn" 
     But I should not see the text "Jake" 
     But I should not see the text "Princess Bubblegum" 
    
    When I enter the query: "Finn"
    Then I should see the text "Finn"
     But I should not see the text "Marceline" 
     And I should not see the text "Jake" 
     And I should not see the text "Princess Bubblegum" 
   
    When I enter the query: ""
    Then I should see the text "Finn"
     And I should see the text "Marceline" 
     And I should see the text "Jake" 
     And I should see the text "Princess Bubblegum" 

  @dev
  Scenario: Search participants by their club
    Given Finn exists
     And Jake exists
     And Marceline exists
     And Princess Bubblegum exists

    When I enter the query: "Marceline"
    Then I should see the text "Marceline"
     But I should not see the text "Finn" 
     But I should not see the text "Jake" 
     But I should not see the text "Princess Bubblegum" 
   
    When I enter the query: "Finn"
    Then I should see the text "Finn"
     But I should not see the text "Marceline" 
     And I should not see the text "Jake" 
     And I should not see the text "Princess Bubblegum" 
    
    When I enter the query: ""
    Then I should see the text "Finn"
     And I should see the text "Marceline" 
     And I should see the text "Jake" 
     And I should see the text "Princess Bubblegum"

