# Hopin's Test and Automation Challenge

## Tasks:

- [x] Test Environment Setup
- [x] Create a test plan and run it mannually
- [x] Create an automated API level test scenario
- [x] Create an automated UI level test scenario

## Test plan for UI (manual verification):

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
| Customers Screen       | Size of the company should say _Big_ if no.of employees greater then 1000                              |                        :white_check_mark:                        |
| Contacts Detail Screen | I should see company details like Name, no.of employees, size and contact information                  |                        :white_check_mark:                        |
| Contacts Detail Screen | I should see a message like _no contact information available_ if contact details are not available    |                        :white_check_mark:                        |
| Contacts Detail Screen | I should see and click on _Back to the list_ button                                                    |                        :white_check_mark:                        |

## Test plan for UI (manual verification):

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

| Test case | Pass/Fail |
| :--------------------- | :--------------------------------------------------------------: |
| Verify response schema when you make POST request with correct name | :white_check_mark:|
| Verify response status code when you make POST request with correct name | :white_check_mark:|
| Verify name and timestamp in response when you make a POST request wtih correct name | :white_check_mark:|
| Verify response status code when you make a POST request with name and special characters | :white_check_mark:|
| Verify size of the company based on number of employees working in the company | :white_check_mark:|
| Verify response status code (400) when I make a POST request with incorrect variables in request body | :white_check_mark:|
| Verify response status code (400) when I make a POST request with empty body | :white_check_mark:|

## Project structure:


<img width="654" alt="Screenshot 2021-08-29 at 19 41 18" src="https://user-images.githubusercontent.com/3956829/131264203-a35e6b32-3b54-4c0b-bae1-ce861b123c3c.png">



