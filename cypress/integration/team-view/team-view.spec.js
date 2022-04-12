import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";

Before(() => {
  cy.loginWithGoogleApi();
});

Given("I am on the Teams view", (url) => {
  // eslint-disable-next-line no-undef
  cy.url().should("include", "/teams");
});

When("There are teams displayed", () => {
  const firstTeam = cy.get("ul li:first");

  expect(firstTeam).to.exist;
});

When("I click a team button", () => {
  const firstTeamButton = cy.get("button");
  firstTeamButton.click();
});

Then("I should be redirected to the relevant team page", (url) => {
  cy.url().should("include", "/team/1");
});

When("See the team information", () => {
  const titleWithName = cy.get("h1");
  const teamMembers = cy.get("ul li");

  expect(titleWithName).to.contain("Team 1");
  expect(teamMembers).to.contain("Nicola");
  expect(teamMembers).to.contain("Dani");
});
