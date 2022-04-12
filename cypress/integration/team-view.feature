Feature: View team information

  Scenario: I am a user in the Teams view

    Given I am on the Teams view
    And there are teams displayed
    When I click a team
    Then I should be redirected to the relevant team page
    And See the team information