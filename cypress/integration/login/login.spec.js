import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("I visit google", () => {
  cy.visit("https://google.com/");
});

Then("the url is google.com", (url) => {
  cy.url().should("eq", "https://www.google.com/");
});
