@feature-tag
Feature: As a d3a User,
    I should be able to successfully create a project,
    so that I can to model and simulate market grids

Background:
    Given I am a logged in User on projects list page

  @login
  Scenario: User should be able to successfully create and delete a project
    When I create a new project with name "My Project"
    Then I should see "My Project" on top of the list
    And I should be able to delete "My Project"

  @login
  Scenario: User should be able to successfully create a new simulation
    When I create a new project with name "My Project"
    And I add a new simulation under "My Project" with below specifications
    | Simulation_name  | Description | Start_date | End_date   | Solar_profile    | Spot_market_type       | Number_of_spot_markets | Length_of_spot_market| Tick_length | Grid_Fees  | time_duration |
    | new simulation   | New project | 12-12-2021 | 12-16-2021 | Partially Cloudy | Two sided pay as bid   | 3                      | 15                   | 15          | Percentage | 10            |
    Then I should verify "My Project" has the simulation "new simulation" listed within it
    And I should be able to delete "My Project"

  @login
  Scenario: User should be able create model in a default simulation
    When I create a new project with name "My Project"
    And I add create a default simulation under "My Project"
    And I create a model with below configuration
    | Main_node  | Main_marker  | node_name |
    | Market     | Market maker | PV        |
