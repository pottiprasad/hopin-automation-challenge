# Hopin's Test and Automation Challenge

## Tasks:

- [x] Test Environment Setup
- [x] Create a test plan and run it mannually
- [ ] Create an automated API level test scenario
- [ ] Create an automated UI level test scenario

## Test Plan:

| User screen            | Test case                                                                                              |     Pass/Fail      |
| :--------------------- | :----------------------------------------------------------------------------------------------------- | :----------------: |
| Welcome Screen         | User presented with a welcome message                                                                  | :white_check_mark: |
| Welcome Screen         | User should see a text field to enter his/her name                                                     | :white_check_mark: |
| Welcome Screen         | User should be able to press submit button                                                             | :white_check_mark: |
| Welcome Screen         | I should see an alert if I press submit without entering my name                                       | :white_check_mark: |
| Welcome Screen         | User should not able to enter numbers or special characters in name field                              |        :x:         |
| Welcome Screen         | User should not able to enter emoji markup in name field                                               |        :x:         |
| Customers Screen       | User presented with his/her name and current data                                                      | :white_check_mark: |
| Customers Screen       | Customer list will be displayed in table format                                                        | :white_check_mark: |
| Customers Screen       | Customer details will be displayed if I click on the company name                                      | :white_check_mark: |
| Customers Screen       | Only company name has to have provision to click                                                       | :white_check_mark: |
| Customers Screen       | Customer comapny size is displayed based on the no.of employees                                        | :white_check_mark: |
| Customers Screen       | I should be able to navigate into all company details pages                                            |        :x:         |
| Customers Screen       | Size of the company should say _Small_ if no.of employees is less than or equal 100                    | :white_check_mark: |
| Customers Screen       | Size of the company should say _Medium_ if no.of employees greater then 10 and less then or equal 1000 | :white_check_mark: |
| Customers Screen       | Size of the company should say _Big_ if no.of employees greater then 1000                              |        :x:         |
| Contacts Detail Screen | I should see company details like Name, no.of employees, size and contact information                  | :white_check_mark: |
| Contacts Detail Screen | I should see a message like _no contact information available_ if contact details are not available    |        :x:         |
| Contacts Detail Screen | I should see and click on _Back to the list_ button                                                    | :white_check_mark: |
