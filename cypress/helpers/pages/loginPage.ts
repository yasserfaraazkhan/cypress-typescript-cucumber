import ProjectListPage from "./projectListPage";

class LoginPage {
  readonly locators = {
    emailtextBox: "#email",
    passwordTextBox: "#password",
    loginButton: "button.button",
    sideMenu: "div.side-nav__main__item__icon",
  };
  readonly labels = {
    login: "Login",
    projects: "projects",
  };
  readonly networkCallsToIntercept = {
    loginPage: "/login",
    loginNetworkCalls: "****/graphql/**",
  };

  visit(): LoginPage {
    cy.intercept("**/graphql/**").as("networkCall");
    cy.visit("/login");
    return this;
  }

  login(): LoginPage {
    cy.fixture("userCredentials.json").then(({ username, password }) => {
      cy.get(this.locators.emailtextBox).clear().type(username);
      cy.get(this.locators.passwordTextBox).clear().type(password);
    });
    cy.get(this.locators.loginButton).contains(this.labels.login).click();
    cy.wait("@networkCall");

    return this;
  }

  goToProjects(): ProjectListPage {
    cy.get(this.locators.sideMenu).eq(1).click();
    cy.url().should("contain", this.labels.projects);
    return new ProjectListPage();
  }
}

export default LoginPage;
