# Hopin's Test and Automation Challenge

## Tasks:

- [x] Test Environment Setup
- [x] Create a test plan and run it manually
- [x] Create an automated API level test scenario
- [x] Create an automated UI level test scenario

## Pre-requisite:

    . Node - v14.16.0

## To run the tests:

1. clone repository
   > git clone git@github.com:pottiprasad/hopin-automation-challenge.git
2. Install all dependencies using `yarn install`
3. To run frontend UI tests use `yarn tests:frontend`, this will start backend service, frontend application and start runnig [frontend tests](https://github.com/pottiprasad/hopin-automation-challenge/tree/main/tests/ui-tests)
4. To run backend API tests use `yarn tests:backend:local`, this will start backend service and run backend tests.

if you run above commands one after another, you might see some errors with port being used by some other process. To make sure your ports are free, please run below command `(lsof -ti:3000,3001) | xargs kill >/dev/null`

On CI, runs in below order

1. `yarn tests:frontend` -- starts backend, frontend services and following that runs frontend tests
2. `yarn tests:backend` -- runs only backend tests (backend service started by above command).

## Project structure:

<img width="654" alt="Screenshot 2021-08-29 at 19 41 18" src="https://user-images.githubusercontent.com/3956829/131264203-a35e6b32-3b54-4c0b-bae1-ce861b123c3c.png">

## Test plan for UI:

| User screen            | Test case                                                                                              |                            Pass/Fail                             |
| :--------------------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------: |
| Welcome Screen         | User presented with a welcome message                                                                  |                        :white_check_mark:                        |
| Welcome Screen         | User should see a text field to enter his/her name                                                     |                        :white_check_mark:                        |
| Welcome Screen         | User should be able to press submit button                                                             |                        :white_check_mark:                        |
| Welcome Screen         | I should see an alert if I press submit without entering my name                                       |                        :white_check_mark:                        |
| Welcome Screen         | User should able to enter numbers or special characters in name field                                  | :white_check_mark: :heavy_exclamation_mark: Validations required |
| Welcome Screen         | User should able to enter emoji markup in name field                                                   | :white_check_mark: :heavy_exclamation_mark: Validations required |
| Customers Screen       | User presented with his/her name and current data                                                      |                        :white_check_mark:                        |
| Customers Screen       | Customer list will be displayed in table format                                                        |                        :white_check_mark:                        |
| Customers Screen       | Customer details will be displayed if I click on the company name                                      |                        :white_check_mark:                        |
| Customers Screen       | User can only click on company name                                                                    |                        :white_check_mark:                        |
| Customers Screen       | I should be able to navigate to all companies details screen                                           |                        :white_check_mark:                        |
| Customers Screen       | Size of the company should say _Small_ if no.of employees is less than or equal 100                    |                        :white_check_mark:                        |
| Customers Screen       | Size of the company should say _Medium_ if no.of employees greater then 10 and less then or equal 1000 |                        :white_check_mark:                        |
| Customers Screen       | Size of the company should say _Big_ if no.of employees greater than 1000                              |                        :white_check_mark:                        |
| Contacts Detail Screen | I should see company details like Name, no.of employees, size and contact information                  |                        :white_check_mark:                        |
| Contacts Detail Screen | I should see a message like _no contact information available_ if contact details are not available    |                        :white_check_mark:                        |
| Contacts Detail Screen | I should see and click on _Back to the list_ button                                                    |                        :white_check_mark:                        |

## Changes I made in frontend

1. Add id's for UI elements [link](https://github.com/pottiprasad/hopin-automation-challenge/blob/main/frontend/src/App.js)
2. Add method [getContactText](https://github.com/pottiprasad/hopin-automation-challenge/blob/926b866db887ab3d8e6bd081f32a1b13b18775fd/frontend/src/App.js#L39) to check contactInfo object exists in feed.
3. Above method is in use [here](https://github.com/pottiprasad/hopin-automation-challenge/blob/926b866db887ab3d8e6bd081f32a1b13b18775fd/frontend/src/App.js#L113)

## Test plan for backend API:

###### Request type

```
POST
```

###### Request body

```
{
    name: {string}
}
```

###### Test cases

| Test case                                                                                             |     Pass/Fail      |
| :---------------------------------------------------------------------------------------------------- | :----------------: |
| Verify response schema when you make POST request with correct name                                   | :white_check_mark: |
| Verify response status code when you make POST request with correct name                              | :white_check_mark: |
| Verify name and timestamp in response when you make a POST request with correct name                  | :white_check_mark: |
| Verify response status code when you make a POST request with name and special characters             | :white_check_mark: |
| Verify size of the company based on number of employees working in the company                        | :white_check_mark: |
| Verify response status code (400) when I make a POST request with incorrect variables in request body | :white_check_mark: |
| Verify response status code (400) when I make a POST request with empty body                          | :white_check_mark: |

## Changes I made in backend

1. Check if name name key exists in request [body] (https://github.com/pottiprasad/hopin-automation-challenge/blob/926b866db887ab3d8e6bd081f32a1b13b18775fd/backend/server.js#L64)
2. Add additional condition to check number of employees in a [medium] (https://github.com/pottiprasad/hopin-automation-challenge/blob/926b866db887ab3d8e6bd081f32a1b13b18775fd/backend/server.js#L56) company

## Approach:

I've added tests for backend service and frontend application, let's start talk about backend tests.

I've used `axios` npm module to make HTTP requests to the backend and stores response object. Added some assertions to validate response status code, schema and response.

[Tests](https://github.com/pottiprasad/hopin-automation-challenge/blob/main/tests/api-tests/customersListServiceTests.js)
[schema](https://github.com/pottiprasad/hopin-automation-challenge/blob/main/tests/utils/schema.js)

I've used `testcafe` to write frontend tests, we have UI tests for all 3 screens.

1. [Welcome screen](https://github.com/pottiprasad/hopin-automation-challenge/blob/main/tests/ui-tests/welcomePageTests.js):
   Tests to make sure text field and formbutton working and also verified alert when user tries to submit form without a name.
2. [Customers list screen](https://github.com/pottiprasad/hopin-automation-challenge/blob/main/tests/ui-tests/customersListPageTets.js):
   I have intercepted the original response using `testcafe RequestMock` and served the response from a local [file](https://github.com/pottiprasad/hopin-automation-challenge/blob/main/tests/mockdata/customers-list.json). When the application becomes bigger and bigger we tend to test the application in isolated mode, this approach will help us to speed up the testing/implementation.

   If you want to run the same test against real service, please remove `mock` from the [array](https://github.com/pottiprasad/hopin-automation-challenge/blob/926b866db887ab3d8e6bd081f32a1b13b18775fd/tests/ui-tests/customersListPageTets.js#L60) and run the script to start automation tests.

3. [Customer details screen](https://github.com/pottiprasad/hopin-automation-challenge/blob/main/tests/ui-tests/customerDetailsPageTests.js)
   This test is to verify that company contact information is available on company details page or not, make sure we display `No contact info available` when contact information is not availble in feed.

## Test results:

Please find here -- https://app.travis-ci.com/github/pottiprasad/hopin-automation-challenge/builds

## Run tests and generate reports locallay:

1. To run frontend tests and generate reports locally, please use

```
yarn tests:frontend:reports
```

2. To run backend tests and generate reports locally, please use

```
yarn tests:frontend:reports
```

Reports will store in local system under folder called `reports`.

###### Sample Reports:

<img width="1904" alt="Screenshot 2021-08-30 at 11 08 29" src="https://user-images.githubusercontent.com/3956829/131324168-5b017111-9859-4757-b874-bd8d721ba4e3.png">

<img width="1904" alt="Screenshot 2021-08-30 at 11 08 25" src="https://user-images.githubusercontent.com/3956829/131324184-36c48994-0de6-4dd5-8c00-02f27897080c.png">

