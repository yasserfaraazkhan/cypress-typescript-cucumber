// tslint:disable-next-line:no-submodule-imports
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "../../helpers/pages/loginPage";

const loginPage = new LoginPage();

Given("I am on the d3a's login page", () => {
  loginPage.visit();
});

When("I login with valid credentials", () => {
  loginPage.login();
});

Then("I should be able to access my projects page", () => {
  loginPage.goToProjects();
});
