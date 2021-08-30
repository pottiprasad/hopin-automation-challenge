import { Selector as $, t } from 'testcafe';

module.exports = {
  elements: {
    customerDetails: $('#customer-details'),
    customerDetailsHeading: $('#customer-details-header'),
    customerDetailsName: $('#customer-name'),
    customerDetailsEmployees: $('#customer-noof-Employees'),
    customerDetailsSize: $('#customer-company-size'),
    customerContact: $('#customer-contact'),
    backToList: $('#back-to-customers-list'),
  },

  /**
   * @returns customer contact informaiton from UI
   */
  async getCustomerContactInfoFromUI() {
    return await this.elements.customerContact.innerText;
  },

  /**
   * Clicks the Back to List button on customer details page
   */
  async navigateBackToCustomersList() {
    await t.click(this.elements.backToList);
  },
};
