// tslint:disable-next-line:no-submodule-imports
import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "../../helpers/pages/loginPage";
import ProjectListPage from "../../helpers/pages/projectListPage";

const loginPage = new LoginPage();
const projectListPage = new ProjectListPage();

Given("I am a logged in User on projects list page", () => {
  loginPage.visit().login().goToProjects();
});

When("I create a new project with name {string}", (projectName) => {
  projectListPage.createNewProject(projectName);
});

Then("I should see {string} on top of the list", (projectName) => {
  projectListPage.assertProjectVisible(projectName);
});

And("I should be able to delete {string}", (projectName) => {
  loginPage
    .goToProjects()
    .deleteproject(projectName)
    .assertProjectNotPresent(projectName);
});

And("I add create a default simulation under {string}", (projectName) => {
  loginPage.goToProjects().createDefaultSimulation(projectName);
});

And(
  "I add a new simulation under {string} with below specifications",
  (projectName, dataTable) => {
    projectListPage.createNewSimulation(projectName, dataTable);
  }
);

Then("I should successfully create a model with below configuration", (dataTable) => {
  projectListPage.createModel(dataTable);
});

Then(
  "I should verify {string} has the simulation {string} listed within it",
  (projectName, simulationName) => {
    loginPage
      .goToProjects()
      .assertSimulationCreatedUnder(projectName, simulationName);
  }
);
