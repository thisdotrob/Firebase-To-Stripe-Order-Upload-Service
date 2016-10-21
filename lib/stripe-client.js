'use strict';

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

function addCustomerWithPaymentSource(customer, payment) {
  return new Promise(resolve => {
    const customerArgs = {
      email: customer.email,
      description: customer.name,
      source: {
        exp_month: payment.details.expiry.split('/')[0],
        exp_year: payment.details.expiry.split('/')[1],
        number: payment.details.number.replace(/\s+/g, ''),
        object: payment.type,
        cvc: payment.details.cvc,
      }
    };

    stripe.customers.create(customerArgs)
      .then(customer => {
        resolve(customer.id);
      });

  });
}

function addCharge(product, customerId) {
  return new Promise(resolve => {
    const chargeArgs = {
      amount: product.price * 100,
      currency: 'GBP',
      customer: customerId,
    };

    stripe.charges.create(chargeArgs)
      .then(charge => {
        resolve({ customerId, chargeId: charge.id });
      });

  });
}

module.exports = {
  addCustomerWithPaymentSource,
  addCharge,
};
