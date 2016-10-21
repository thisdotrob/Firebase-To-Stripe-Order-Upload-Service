'use strict';

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

function addCustomerWithPaymentSource(customer, payment) {
  return stripe.customers.create({
    id: customer.id,
    email: customer.email,
    description: customer.name,
    source: {
      exp_month: payment.details.expiry.split('/')[0],
      exp_year: payment.details.expiry.split('/')[1],
      number: payment.details.number.replace(/\s+/g, ''),
      object: payment.type,
      cvc: payment.details.cvc,
    },
  });
}

module.exports = {
  addCustomerWithPaymentSource,
};
