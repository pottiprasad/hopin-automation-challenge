import welcomePage from '../pages/welcomePage';
import customersListPage from '../pages/customersListPage';
import customerDetails from '../pages/customerDetailsPage';
import uihelpers from '../utils/uiHelpers';
import apiHelpers from '../utils/apiHelpers';
import config from 'config';
import fs from 'fs';

const customerAppUser = config.get('appUser');
const url = config.get('frontendURL');
const serviceURL = config.get('backendURL');
const mockCustomersList = Buffer.from(
  fs.readFileSync('tests/mockdata/customers-list.json')
);

const mock = apiHelpers.mockResponseFor(serviceURL, mockCustomersList);
const requestLogger = apiHelpers.getRequestLogger(serviceURL);

fixture`Customer details screen`.page`${url}`.beforeEach(async (t) => {
  await t
    .typeText(welcomePage.elements.nameField, customerAppUser)
    .click(welcomePage.elements.formSubmit);
  await customersListPage.elements.customersListTable.with({ visibilityCheck: true })();
});

test.requestHooks(requestLogger)(
  'I should see customer contacts details when I select a customer',
  async (t) => {
    const customerCount = await customersListPage.getCustomerCountFromUI();
    const customerFromFeed = await apiHelpers.getCustomersFromRequestLogger(
      requestLogger
    );
    if (customerCount > 1) {
      for (let i = 0; i < customerCount; i++) {
        await t.click(await customersListPage.elements.customerDetails(i + 1));
        await uihelpers.isCustomerContactDetailsElementsVisible();
        if (customerFromFeed[i].contactInfo) {
          await t
            .expect(await customerDetails.getCustomerContactInfoFromUI())
            .contains(
              `${customerFromFeed[i].contactInfo.name} (${customerFromFeed[i].contactInfo.email})`,
              'Contact info not matched against original feed'
            );
        } else {
          await t
            .expect(await customerDetails.getCustomerContactInfoFromUI())
            .contains(
              'No contact info available',
              'Message not matched when contact info not available in feed'
            );
        }
        await customerDetails.navigateBackToCustomersList();
      }
    } else {
      throw new Error('Customers list is empty');
    }
  }
);
