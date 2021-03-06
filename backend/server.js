const port = 3001;
const express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const database = {
  customers: [
    {
      id: 1,
      name: 'Americas Inc.',
      employees: 10,
      contactInfo: { name: 'John Smith', email: 'jsmith@americasinc.com' },
    },
    {
      id: 2,
      name: 'Caribian Airlnis',
      employees: 1000,
      contactInfo: { name: 'Jose Martinez', email: 'martines@cair.com' },
    },
    {
      id: 3,
      name: 'MacroSoft',
      employees: 540,
      contactInfo: { name: 'Bill Paxton', email: 'bp@ms.com' },
    },
    { id: 4, name: 'United Brands', employees: 20 },
    {
      id: 5,
      name: 'Bananas Corp',
      employees: 10000,
      contactInfo: { name: 'Xavier Hernandez', email: 'xavier@bananas.com' },
    },
    {
      id: 6,
      name: 'XPTO.com',
      employees: 102,
      contactInfo: { name: 'Daniel Zuck', email: 'zuckh@xpto.com' },
    },
  ],
};

const getSize = (customer) => {
  return customer.employees <= 100
    ? 'Small'
    : customer.employees > 10 && customer.employees <= 1000
    ? 'Medium'
    : 'Big';
};

app.post('/', (req, res) => {
  const name = req.body.name;
  res.set('Access-Control-Allow-Origin', '*');
  if (req.body.name === '' || !req.body.name) {
    return res
      .status(400)
      .json({ status: 400, message: 'name is a required field' });
  } else {
    const response = {
      name,
      timestamp: new Date().toDateString(),
      customers: database.customers.map((customer) => {
        customer.size = getSize(customer);
        return customer;
      }),
    };
    return res.json(response);
  }
});

app.listen(port, () => console.log(`Backend app listening on port ${port}!`));
