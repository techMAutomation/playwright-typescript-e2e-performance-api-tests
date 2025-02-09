# playwright-typescript-e2e-performance-api-tests

-----

Welcome to the Playwright Typescript automation framework for E2E, Performance and API tests.
Performance tests implemented using lighthouse.
This project helps you to understand and execute tests then generates reports using Allure.

### Getting Started

1. Connect to [GitHub](https://github.com/techMAutomation)
2. Open your terminal
3. Clone the repository
    ```bash
    git clone https://github.com/techMAutomation/playwright-typescript-e2e-performance-api-tests.git
    ```
4. Install dependencies:
    ```bash
    npm install 
    ```

### Run E2E Tests

**Run all E2E tests**
  Use the following command to run all tests locally:
  ```bash
  npm run e2e:all:tests:headed (or) npx playwright test
  ```

**Run specific E2E tests using Custom tags**
  Run a subset of tests filtered by custom tags using the command below:
  ```bash
  npm run e2e:smoke:tests 
  (or) 
  npx playwright test --grep @smoke
  ```  
### Run API Tests

**Run all API tests**
  Use the following command to run all tests:
  ```bash
  npm run api:tests 
  (or) 
  npx playwright test --grep @api
  ```

### Allure Report

**Generate Allure Report**
  Allure Report requires Java. Please ensure Java is installed. 
  Use the following command to generate the allure report:
  ```bash
  npm run posttest
  ```
