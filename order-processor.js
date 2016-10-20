'use strict';

const stripeClient = require('./stripe-client');

function process(order) {
  const customer = order.val().customer;
  const paymentSource = order.val().payment;
  stripeClient.addCustomerWithPaymentSource(customer, paymentSource);
}

module.exports = {
  process,
};
