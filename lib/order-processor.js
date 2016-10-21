'use strict';

const stripeClient = require('./stripe-client');
const firebaseUpdater = require('./firebase-updater');

function process(orderData) {
  const order = orderData.val();
  return addCustomerToStripe(order)
    .then(addChargeToStripe(order))
    .then(updateOrder(orderData.key));
}

function addCustomerToStripe(order) {
  return stripeClient.addCustomerWithPaymentSource(order.customer, order.payment);
}

function addChargeToStripe(order) {
  return (customerId) => stripeClient.addCharge(order.product, customerId);
}

function updateOrder(orderKey) {
  return (stripeIds) => firebaseUpdater.updateOrderWithStripeIds(orderKey, stripeIds);
}

module.exports = {
  process,
};
