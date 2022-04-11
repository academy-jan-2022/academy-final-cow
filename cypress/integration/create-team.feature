Feature: Create a team

    Scenario: Navigating to the new team view
        Given I am logged in
        And I am on the Teams View
        When I click on create new team
        Then I get redirected into New Team View

    Scenario: Create the team
        Given I am logged in
        And I am on the Teams View
        When I complete the required data
        And I click on Save Team button
        Then A new team has been created
        And I get redirected into the Team View

    Scenario: Cancel creating the team
        Given I am logged in
        And I am on the Teams View
        And I click on Cancel button
        And I get redirected into Teams View