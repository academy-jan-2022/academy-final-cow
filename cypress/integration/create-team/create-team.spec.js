import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";

Given("I am logged in", () => {
  cy.visit("localhost:3000");
  cy.loginWithGoogleApi();
});

And("I am on the Teams View", (url) => {
  cy.url().should("include", "/teams");
});

And("I complete the required data", (url) => {
  cy.get("#team-name").should("be.visible").type("Team Name");

  cy.get("#team-description").should("be.visible").type("Team description");
});

When("I click on create new team", (url) => {
  cy.get(".create-team-btn").click();
});

And("I click on Save Team button", (url) => {
  cy.intercept('POST', '/create-team', {
    statusCode: 201,
    body: {
      teamId: '2',
    },
  })
  cy.get("#save-team-btn").click();

});

When("I click on Cancel button", (url) => {
  cy.get("#cancel-team-btn").click();
});

Then("I get redirected into New Team View", (url) => {
  cy.url().should("include", "/create-team");
});

Then("I get redirected into Teams View", (url) => {
  cy.url().should("include", "/teams");
});

Then("I get redirected into the Team View", (url) => {
  cy.url().should("include", "/team");
});
