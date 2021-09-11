class ProjectListPage {
  readonly locators = {
    createNewProjectBtn: "button.button-icon",
    buttonLocator: "span.button__label",
    projectList: "div.saved-project",
    projectSettingsOption: "div.saved-project__cog",
    projectOptionsList: "button.context-menu--options-button",
    projectNameOnListPage: "span.saved-project__headline__name__text",
    projectNameTextBox: "#input-field-name",
    simulationCloudCoverage: "select[name=cloudCoverage]",
    simulationSpotMarketType: "select[name=spotMarketType]",
    simulationDescription: "#textarea-field-description",
    simulationStartDate: "#input-field-startDate",
    simulationEndDate: "#input-field-endDate",
    simulationNumberSpotMarket: "#input-field-marketCount",
    simulationLenghtSpotMarket: "#input-field-slotLengthMinutes",
    simulationTickLenght: "#input-field-tickLengthSeconds",
    simulationGridFees: "select[name=gridFeeType]",
    simulationRealTimeDuration: "#input-field-slotLengthRealtimeSeconds",
    warningModalHeader: "h3.warning-modal__header",
  };
  readonly labels = {
    add: "Add",
    confirmDeleteTxt: "I'm sure",
    login: "new project",
    next: "Next",
    newSimulation: "new simulation",
    projects: "projects",
    save: "Save",
    warningMessage:
      "Are you sure you want to delete this project and all of its simulations?",
  };
  readonly networkCallsToIntercept = {
    loginPage: "/login",
    loginNetworkCalls: "****/graphql/**",
    simulationCreation: "**configuration/step1**",
  };

  deleteproject(projectName: any): ProjectListPage {
    cy.get(this.locators.projectList)
      .find(this.locators.projectNameOnListPage)
      .contains(projectName)
      .parents()
      .find(this.locators.projectSettingsOption)
      .click();
    cy.get(this.locators.projectOptionsList).contains("Delete").click();
    cy.get(this.locators.warningModalHeader).should(
      "have.text",
      this.labels.warningMessage
    );
    cy.get(this.locators.buttonLocator)
      .contains(this.labels.confirmDeleteTxt)
      .click();

    return this;
  }

  createModel(modelDetails: { hashes: () => any[] }) {
    cy.wait("@networkCall");
    modelDetails.hashes().forEach((row) => {
      cy.get("div.configuration-tree-node-container").click();
      cy.get(this.locators.buttonLocator).contains(this.labels.save).click();
      cy.wait(1000);
      cy.get("div.configuration-tree-node-container").eq(2).click();
      cy.get(this.locators.buttonLocator).contains(this.labels.save).click();
      cy.wait(1000);
      cy.get("div.configuration-tree-node-container").eq(3).click();
      cy.wait(1000);
      cy.get("div.node-card")
        .find("span.node-card__name")
        .contains(row.node_name)
        .prev()
        .click();
      cy.get(this.locators.buttonLocator).contains(this.labels.save).click();
      cy.wait(1000);
    });
    return this;
  }

  createDefaultSimulation(projectName: string) {
    cy.intercept(this.networkCallsToIntercept.simulationCreation).as(
      "completeStep1"
    );
    cy.get("span.saved-project__headline__name")
      .find("span")
      .contains(projectName)
      .click();
    cy.get(this.locators.buttonLocator)
      .contains(this.labels.newSimulation)
      .click();
    cy.wait(1000);
    cy.get(this.locators.buttonLocator).contains(this.labels.next).click();
    return this;
  }

  createNewSimulation(
    projectName: string,
    simulationDetails: any
  ): ProjectListPage {
    cy.get("span.saved-project__headline__name")
      .find("span")
      .contains(projectName)
      .click();
    cy.get(this.locators.buttonLocator)
      .contains(this.labels.newSimulation)
      .click();

    simulationDetails
      .hashes()
      .forEach(
        (row: {
          Simulation_name: any;
          Description: any;
          Start_date: any;
          End_date: any;
          Solar_profile: any;
          Spot_market_type: any;
          Number_of_spot_markets: any;
          Length_of_spot_market: any;
          Tick_length: any;
          Grid_Fees: any;
          time_duration: any;
        }) => {
          const {
            Simulation_name,
            Description,
            Start_date,
            End_date,
            Solar_profile,
            Spot_market_type,
            Number_of_spot_markets,
            Length_of_spot_market,
            Tick_length,
            Grid_Fees,
            time_duration,
          } = row;

          cy.get(this.locators.projectNameTextBox)
            .clear()
            .type(Simulation_name);
          cy.get(this.locators.simulationDescription).clear().type(Description);
          cy.get(this.locators.simulationStartDate)
            .clear()
            .type(Start_date)
            .type("{enter}");
          cy.get(this.locators.simulationEndDate)
            .clear()
            .type(End_date)
            .type("{enter}");
          cy.get(this.locators.simulationCloudCoverage).select(Solar_profile);
          cy.get(this.locators.simulationSpotMarketType).select(
            Spot_market_type
          );
          cy.get(this.locators.simulationNumberSpotMarket)
            .clear()
            .type(Number_of_spot_markets);
          cy.get(this.locators.simulationLenghtSpotMarket).should(
            "have.value",
            Length_of_spot_market
          );
          cy.get(this.locators.simulationTickLenght).clear().type(Tick_length);
          cy.get(this.locators.simulationGridFees).select(Grid_Fees);
          cy.get(this.locators.simulationRealTimeDuration)
            .clear()
            .type(time_duration);
          cy.get(this.locators.buttonLocator)
            .contains(this.labels.next)
            .click();
        }
      );
    return this;
  }

  createNewProject(projectName: any): ProjectListPage {
    cy.get(this.locators.createNewProjectBtn).click();
    cy.get(this.locators.projectNameTextBox).clear().type(projectName);
    cy.get(this.locators.buttonLocator).contains(this.labels.add).click();
    cy.reload();
    return this;
  }

  assertProjectVisible(projectName: any): ProjectListPage {
    cy.get("span.saved-project__headline__name")
      .find("span")
      .contains(projectName)
      .should("be.visible");
    return this;
  }

  assertProjectNotPresent(projectName: any): ProjectListPage {
    cy.get(this.locators.projectList)
      .find(this.locators.projectNameOnListPage)
      .contains(projectName)
      .should("not.exist");
    return this;
  }

  assertSimulationCreatedUnder(projectName: string, simulationName: string) {
    cy.get(this.locators.projectList)
      .find(this.locators.projectNameOnListPage)
      .contains(projectName)
      .parents()
      .find("div.saved-config--pct-width__title__name")
      .should("contain", simulationName);
    return this;
  }
}

export default ProjectListPage;
