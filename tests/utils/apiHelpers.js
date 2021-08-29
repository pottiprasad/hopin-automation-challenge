import { RequestMock, RequestLogger } from 'testcafe';
import axios from 'axios';

module.exports = {
  /**
   *
   * @param {string} url
   * @param {Object} response
   * @returns
   */
  mockResponseFor(url, response) {
    return RequestMock().onRequestTo(url).respond(response, 200, {
      'content-length': response.length,
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'access-control-allow-headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
  },

  /**
   * creats a request logger and filter by URL
   * @param {string} url
   * @returns {RequestLogger}
   */
  getRequestLogger(url) {
    return RequestLogger(url, {
      method: 'post',
      logRequestHeaders: true,
      logRequestBody: true,
      stringifyRequestBody: true,
      logResponseHeaders: true,
      logResponseBody: true,
      stringifyResponseBody: true,
    });
  },

  /**
   * Returns response object of a HTTP POST response
   * @param {RequestLogger} requestLogger
   * @returns {Object} customres
   */
  async getCustomersFromRequestLogger(requestLogger) {
    let response = await requestLogger.requests[1].response.body;
    return JSON.parse(response).customers;
  },

  /**
   * Returns HTTP Post response object
   * @param {string} url
   * @param {Object} body
   * @returns {Object}
   */
  async makeAHTTPPostRequest(url, body) {
    return await axios.post(url, body);
  },
};
