## Libraries

- [cypress](https://www.cypress.io/) - A JavaScript-based end-to-end testing framework.
- [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-example) - Library used to support Behavior-Driven Development (BDD) using Cucumber.

## Running Tests

You can run the tests by opening Cypress using the below command line. 

# Requirements
Test Data can be handled in 2 ways in this
1. Need to create a fixture file 
```
//cypress/fixtures/userCredentials.json
{
    "username": "<secret>",
    "password": "<secret>"
}
```
2. Need to create cypress env json to be user for API calls
```
//cypress.env.json
{
    "username": "<secret>",
    "password": "<secret>",
    "requestUrl": "https://d3aweb.gridsingularity.com/graphql/"
}
```
Then simple run with these options

```
npm run open
```

You can also execute all tests through the terminal with the command line below.
```
npm run test
```

You can also specify which tags you want to execute by passing as an argument following the syntax `not @tag1 and (@tag2 or @tag3)` like the command line below:
```
npm run test --e TAGS='@login'
```

You can also change the `baseURL` by setting the `CYPRESS_BASE_URL` environment variable like the command line below:
```
CYPRESS_BASE_URL=http://example.com npm run cy:run
```

### Single feature files

Put your feature files in `cypress/integration/`

Example: cypress/integration/Google.feature

```gherkin
Feature: Login Page

  I want to open a d3a Login page
  
  @login
  Scenario: Opening a search engine page
    Given I am on login page
    Then I should see the empty login form
```

### Bundled features files

When running Cypress tests in a headless mode, the execution time can get pretty bloated, this happens because by default Cypress will relaunch the browser between every feature file.
The **cypress-cucumber-preprocessor** gives you the option to bundle all feature files before running the tests, therefore reducing the execution time.

You can take advantage of this by creating `.features` files. You choose to have only one in the root of the directory `cypress/integrations` or per directory.

You also have to add support for `.features` files to your Cypress configuration

`cypress.json`

```json
{
  "testFiles": "**/*.{feature,features}"
}
```

To run the bundled tests:

```shell
cypress run --spec **/*.features
```

### Step definitions

**This is the RECOMMENDED way**

#### Step definitions creation

The `.feature` file will use steps definitions from a directory with the same name as your `.feature` file. The javascript files containing the step definitions can have other names if you want to break them into different concerns.

Easier to show than to explain, so, assuming the feature file is in `cypress/integration/Google.feature` , as proposed above, the preprocessor will read all the files inside `cypress/integration/Google/`, so:

`cypress/integration/login/login.ts` (or any other .ts file in the same path)

```javascript
import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://d3a.com/login'
Given('I am on login page', () => {
  cy.visit(url)
})
```

This is a good place to put *before/beforeEach/after/afterEach* hooks related to **that particular feature**. This is incredibly hard to get right with pure cucumber.  
