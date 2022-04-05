import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("I visit the homepage", () => {
  // cy.visit("localhost:3000");
});

Then("there should be text that says homepage", (url) => {
  // cy.get("p").contains("Homepage");
});
