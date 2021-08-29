import welcomePage from '../pages/welcomePage';
import config from 'config';

const url = config.get('frontendURL');

fixture`Welcome page`.page`${url}`;

test('As a user I should see default welcome heading', async (t) => {
  await t
    .expect(await welcomePage.isHeadingExists('Welcome to Customer App'))
    .ok('Header not matched');
});

test('I should see an alert if I submit form without a name', async (t) => {
  const alertDialogHistory = await welcomePage.submitFormWithoutName();
  await t
    .expect(alertDialogHistory[0].type)
    .eql('alert')
    .expect(alertDialogHistory[0].text)
    .eql('Please provide your name', 'Alert message not mached');
});
