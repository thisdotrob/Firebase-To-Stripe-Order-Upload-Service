'use strict';

const firebaseClient = require('./firebase-client');

function updateOrderWithStripeChargeId(orderKey, stripeChargeId) {
  return firebaseClient.ref(`orders/${orderKey}/stripeChargeId`).set(stripeChargeId);
}

module.exports = {
  updateOrderWithStripeChargeId,
}
