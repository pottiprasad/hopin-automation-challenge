import { Selector as $ } from 'testcafe';

module.exports = {
  elements: {
    greetingMessage: $('#greeting'),
    customersListTable: $('#customers-list'),
    customerDetails: (index) =>
    $('#customers-list').find('tr').nth(index).find('td').find('a'),
  },
  
  /**
   * Checks if greeting message displayed or not
   * @return {bool}
   */
  async isInformationDisplayed() {
    return await this.elements.greetingMessage.exists;
  },

  /**
   * Get displayed information
   * @return {string}
   */
  async getInformation() {
    return await this.elements.greetingMessage.innerText;
  },

  /**
   * Checks if customers table displayed or not
   * @return {bool}
   */
  async isCustomersInformationDisplayed() {
    return await this.elements.customersListTable.exists;
  },

  /**
   * Retuns number of customers displayed on UI
   * @return {number}
   */
  async getCustomerCountFromUI() {
    //Reducing length of 1 for headers in table
    return (await this.elements.customersListTable.find('tr').count) - 1;
  },

  /**
   * Get row and cell text from customer table
   * @return {string}
   */
  async customerTable() {
    return this.elements.customersListTable.addCustomMethods({
      getRowText: (table, rowIndex) => {
        return table.rows[rowIndex].innerText;
      },
      getCellText: (table, rowIndex, columnIndex) => {
        return table.rows[rowIndex].cells[columnIndex].innerText;
      },
    });
  },
};
