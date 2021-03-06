import apiHelpers from '../utils/apiHelpers';
import getSchema from '../utils/schema';
import config from 'config';
import axios from 'axios';
const backendURL = config.get('backendURL');
const customerAppUser = config.get('appUser');

fixture`Verify customer end point`;

test('Verify schema and status code', async (t) => {
  const body = {
    name: customerAppUser,
  };
  const response = await apiHelpers.makeAHTTPPostRequest(backendURL, body);
  const schemaValidateResponse = getSchema('customers').validate(response.data);
  const isValidationFailed = schemaValidateResponse.error ? false : true;
  await t
    .expect(isValidationFailed)
    .ok('Response not matched with schema')
    .expect(response.status)
    .eql(200, `HTTP response code doesn't match - ${response.status}`);
});

test('Verify name and timestamp when I send correct variables in request body', async (t) => {
  const body = {
    name: 'customerAppUser',
  };
  const response = await apiHelpers.makeAHTTPPostRequest(backendURL, body);
  await t
    .expect(response.data.name)
    .eql(
      body.name,
      `Request body name ${body.name} doesn't match with response name ${response.data.name}`
    )
    .expect(response.data.timestamp)
    .eql(new Date().toDateString(), `Time stamp not matched`);
});

test('Verify status code when I send incorrect name in the body', async (t) => {
  const body = {
    name: '£$%^& Prasad *($%^&*(',
  };
  const response = await apiHelpers.makeAHTTPPostRequest(backendURL, body);
  await t
    .expect(response.status)
    .eql(200, `HTTP response code doesn't match - ${response.status}`);
});

test('Verify size of the company based on employees count', async (t) => {
  const body = {
    name: 'customerAppUser',
  };
  const response = await apiHelpers.makeAHTTPPostRequest(backendURL, body);
  const customers = response.data.customers;
  let customer;
  for (let i = 0; i < customers.length; i++) {
    customer = customers[i];
    if (customer.employees <= 100) {
      await t
        .expect(customer.size)
        .eql(
          'Small',
          `${customer.name} has ${customer.employees} but size says ${customer.size}`
        );
    } else if (customer.employees > 10 && customer.employees <= 1000) {
      await t
        .expect(customer.size)
        .eql(
          'Medium',
          `${customer.name} has ${customer.employees} but size says ${customer.size}`
        );
    } else {
      await t
        .expect(customer.size)
        .eql(
          'Big',
          `${customer.name} has ${customer.employees} but size says ${customer.size}`
        );
    }
  }
});

test('Verify status code when I send incorrect variables in request body', async (t) => {
  let res;
  const body = {
    test: 'wrong variable',
  };
  try {
    res = await axios.post(backendURL, body);
  } catch (err) {
    await t
      .expect(err.response.status)
      .eql(400, `HTTP response code doesn't match`);
  }
});

test('Verify status code when my request body is empty', async (t) => {
  let res;
  const body = {};
  try {
    res = await axios.post(backendURL, body);
  } catch (err) {
    await t
      .expect(err.response.status)
      .eql(400, `HTTP response code doesn't match`);
  }
});
