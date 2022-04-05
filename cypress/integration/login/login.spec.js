import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("I go to the homepage", () => {
  cy.visit("localhost:3000");
});

Then("I should see a login button", (url) => {
  cy.get("button").contains("Login");
});
