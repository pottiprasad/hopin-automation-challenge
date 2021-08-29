import { t } from 'testcafe';
import customerDetails from '../pages/customerDetailsPage';

module.exports = {
  /**
   * this helper is just to make sure all elements are displayed
   * when user navigates to details page
   */
  async isCustomerContactDetailsElementsVisible() {
    await t
      .expect(customerDetails.customerDetailsHeading.visible)
      .ok('Customer details heading is not visible')
      .expect(customerDetails.customerDetailsName.visible)
      .ok('Customer details name is not visible')
      .expect(customerDetails.customerDetailsEmployees.visible)
      .ok('Customer details employees are not visible')
      .expect(customerDetails.customerDetailsSize.visible)
      .ok('Customer company size not visible')
      .expect(customerDetails.customerContact.visible)
      .ok('Customer contact information not visible');
  },
};
