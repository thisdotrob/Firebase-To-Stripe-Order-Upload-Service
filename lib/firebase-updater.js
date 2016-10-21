'use strict';

const firebaseClient = require('./firebase-client');

function updateOrderWithStripeIds(orderKey, stripeIds) {
  return Promise.all([
    updateOrderWithStripeChargeId(orderKey, stripeIds.chargeId),
    updateOrderWithStripeCustomerId(orderKey, stripeIds.customerId),
  ]);
}

function updateOrderWithStripeChargeId(orderKey, stripeChargeId) {
  return firebaseClient.ref(`orders/${orderKey}/stripeChargeId`).set(stripeChargeId);
}

function updateOrderWithStripeCustomerId(orderKey, stripeCustomerId) {
  return firebaseClient.ref(`orders/${orderKey}/customer/stripeCustomerId`).set(stripeCustomerId);
}

module.exports = {
  updateOrderWithStripeIds,
  updateOrderWithStripeChargeId,
  updateOrderWithStripeCustomerId,
}
