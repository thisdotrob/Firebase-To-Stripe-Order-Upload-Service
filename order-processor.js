'use strict';

const stripeClient = require('./stripe-client');

function process(orderData) {
  const order = orderData.val();
  return addCustomerToStripe(order)
    .then(addChargeToStripe(order));
}

function addCustomerToStripe(order) {
  return stripeClient.addCustomerWithPaymentSource(order.customer, order.payment);
}

function addChargeToStripe(order) {
  return (customerId) => stripeClient.addCharge(order.product, customerId);
}

module.exports = {
  process,
};
