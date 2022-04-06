Feature: Google Login on Homepage

  Scenario: I am a user who is not logged in

    When I am on the homepage
    Then I should see a login button

  Scenario: I am a user who is logging in

    Given I am on the homepage
    When I log in with google authentication again
    Then I am logged in
    And I am redirected to the TEAMS page
