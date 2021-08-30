import { Selector as $, t } from 'testcafe';

module.exports = {
  elements: {
    welcomeHeading: $('#welcome'),
    nameField: $('#name'),
    formSubmit: $('#form-submit'),
  },

  /**
   * test if welcome heading exists
   * @param  {string} heading
   * @return {bool}
   */
  async isHeadingExists(heading) {
    return await this.elements.welcomeHeading.withText(heading).exists;
  },

  /**
   * submit button without a name
   * @return {Object}
   * return dialouge history object
   */
  async submitFormWithoutName() {
    await t.setNativeDialogHandler(() => true).click(this.elements.formSubmit);
    return await t.getNativeDialogHistory();
  },
};
