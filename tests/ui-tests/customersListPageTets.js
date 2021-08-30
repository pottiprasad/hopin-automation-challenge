import welcomePage from '../pages/welcomePage';
import customersListPage from '../pages/customersListPage';
import apiHelpers from '../utils/apiHelpers';
import fs from 'fs';
import config from 'config';

const customersAppUser = config.get('appUser');
const url = config.get('frontendURL');
const serviceURL = config.get('backendURL');
const mockCustomersList = Buffer.from(
  fs.readFileSync('tests/mockdata/customers-list.json')
);

const mock = apiHelpers.mockResponseFor(serviceURL, mockCustomersList);
const requestLogger = apiHelpers.getRequestLogger(serviceURL);

fixture`Customers list Screen`.page`${url}`.beforeEach(async (t) => {
  await t
    .typeText(welcomePage.elements.nameField, customersAppUser)
    .click(welcomePage.elements.formSubmit);
  await customersListPage.elements.customersListTable.with({ visibilityCheck: true })();
});

test('I should see my name and current date in greeting message ', async (t) => {
  const expectedMessage = `Hi ${customersAppUser}. It is now ${new Date().toDateString()} 
          and here is our customer list. Click on each of them to view their contact details.`;
  await customersListPage.elements.greetingMessage.withExactText(
    expectedMessage,
    'Greeting message is not matched'
  );
});

test('I will be presented with a customer list table', async (t) => {
  await t
    .expect(await customersListPage.elements.customersListTable.exists)
    .ok('customer list table is not displayed');
});

test.requestHooks([requestLogger])(
  'I should see same number of customers as per feed',
  async (t) => {
    let response = requestLogger.requests[1].response.body;
    response = JSON.parse(response);
    const listOfCustomersInResponse = response.customers;
    await t
      .expect(await customersListPage.getCustomerCountFromUI())
      .eql(
        listOfCustomersInResponse.length,
        'No of customer is not matched with feed'
      );
  }
);

/**
 * I've added requests hooks at test level,
 * now it is intercepting calls and overriding response data.
 * if you want to see the same test run in E2E
 * please remove mock from the array in line no:54
 */
test.requestHooks([requestLogger, mock])(
  'Customers list should match with feed',
  async (t) => {
    const customerCount = await customersListPage.getCustomerCountFromUI();
    let response = await requestLogger.requests[1].response.body;
    response = JSON.parse(response);
    const listOfCustomersInResponse = response.customers;
    const customerListTable = await customersListPage.customerTable();
    for (let i = 0; i < customerCount; i++) {
      await t
        .expect(await customerListTable.getCellText(i + 1, 0))
        .eql(listOfCustomersInResponse[i].name, "Company name doesn't match");
      await t
        .expect(await customerListTable.getCellText(i + 1, 1))
        .eql(
          listOfCustomersInResponse[i].employees + '',
          "Employees count doesn't match"
        );
      await t
        .expect(await customerListTable.getCellText(i + 1, 2))
        .eql(listOfCustomersInResponse[i].size, "Company size doesn't match");
    }
  }
);

/**
 * We have covered this test in backend tests as well, (tests/api-tests/customersList.js lin:51)
 * this is just adding an extra layer of protection from frontend perspective.
 */
test('Verify size of the company based on number of employees working', async (t) => {
  const customerCount = await customersListPage.getCustomerCountFromUI();
  const customerListTable = await customersListPage.customerTable();
  let companyName, employeesInCompany;
  for (let i = 0; i < customerCount; i++) {
    companyName = await customerListTable.getCellText(i + 1, 0);
    employeesInCompany = await customerListTable.getCellText(i + 1, 1);
    if (employeesInCompany <= 100) {
      await t
        .expect(await customerListTable.getCellText(i + 1, 2))
        .eql('Small', `Company size is wrong for ${companyName} company`);
    } else if (employeesInCompany > 10 && employeesInCompany <= 1000) {
      await t
        .expect(await customerListTable.getCellText(i + 1, 2))
        .eql('Medium', `Company size is wrong for ${companyName} company`);
    } else {
      await t
        .expect(await customerListTable.getCellText(i + 1, 2))
        .eql('Big', `Company size is wrong for ${companyName} company`);
    }
  }
});
