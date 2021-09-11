@feature-tag
Feature: As a d3a User, I should be able to successfully login, so that I can manage my projects

  @login
  Scenario: User should be able to successfully login
    Given I am on the d3a's login page
    When I login with valid credentials
    Then I should be able to access my projects page 
