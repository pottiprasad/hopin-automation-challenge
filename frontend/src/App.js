import React, { Component } from 'react';

const serverPort = 3001;
const serverURL = `http://localhost:${serverPort}/`;

class CustomerApp extends Component {
  state = {
    name: null,
    timestamp: null,
    customers: null,
    customer: null,
  };

  async getCustomer(customer) {
    this.setState({ customer });
  }

  async getCustomers() {
    const userName = document.getElementById('name').value;
    if (!userName || userName === '') {
      alert('Please provide your name');
      return;
    }

    const axios = require('axios');
    const server = axios.create({
      baseURL: serverURL,
    });

    try {
      const response = await server.post('/', { name: userName });
      const { name, timestamp, customers } = response.data;
      this.setState({ name, timestamp, customers });
    } catch (error) {
      alert(error);
    }
  }

  getContactText = () => {
    return this.state.customer.contactInfo
      ? `${this.state.customer.contactInfo.name} (${this.state.customer.contactInfo.email})`
      : 'No contact info available';
  };

  render() {
    return (
      <div>
        {!this.state.name && (
          <div>
            <p>Please provide your name:</p>
            <p>
              <input type="text" id="name" />
              <input
                type="button"
                value="Submit"
                id="form-submit"
                onClick={this.getCustomers.bind(this)}
              />
            </p>
          </div>
        )}
        {this.state.name && (
          <div>
            <p id="greeting">
              Hi <b>{this.state.name}</b>. It is now{' '}
              <b>{this.state.timestamp}</b> and here is our customer list. Click
              on each of them to view their contact details.
            </p>
            {!this.state.customer && (
              <div>
                <table id="customers-list" border="1">
                  <thead>
                    <tr id="customer">
                      <th id="customer-name-header">Name</th>
                      <th id="customer-employees-header"># of Employees</th>
                      <th id="customer-company-size-header">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.customers.map((customer) => (
                      <tr id={`customerInfo`} key={customer.id}>
                        <td id="customer-name">
                          <a
                            href="#"
                            onClick={() => this.getCustomer(customer)}
                          >
                            {customer.name}
                          </a>
                        </td>
                        <td id="customer-employees">{customer.employees}</td>
                        <td id="customer-company-size">{customer.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {this.state.customer && (
              <div id="customer-details">
                <p id="customer-details-header">
                  <b>Customer Details</b>
                </p>
                <p id="customer-name">
                  <b>Name:</b> {this.state.customer.name}
                </p>
                <p id="customer-noof-Employees">
                  <b># of Employees:</b> {this.state.customer.employees}
                </p>
                <p id="customer-company-size">
                  <b>Size:</b> {this.state.customer.size}
                </p>
                <p id="customer-contact">
                  <b>Contact:</b> {this.getContactText()}
                </p>
                <input
                  type="button"
                  id="back-to-customers-list"
                  value="Back to the list"
                  onClick={() => this.setState({ customer: null })}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <h1 id="welcome">Welcome to Customer App</h1>
      <CustomerApp />
    </div>
  );
}

export default App;
