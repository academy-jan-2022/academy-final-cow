import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("I am on the homepage", () => {
  cy.visit("localhost:3000");
});

Then("I should see a login button", (url) => {
  cy.get("button").contains("Login");
});

When("I log in with google authentication again", (url) => {
  cy.loginWithGoogleApi();
});

Then("I am logged in", (url) => {
  expect(window.localStorage.getItem("googleCypress")).to.not.be.null;
});

Then("I am redirected to the TEAMS page", (url) => {
  cy.url().should("include", "/teams");
});
