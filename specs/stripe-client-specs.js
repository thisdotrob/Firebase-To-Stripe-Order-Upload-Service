'use strict';

const proxyquire = require('proxyquire');
const should = require('should');
const sinon = require('sinon');

const stripe = {
  customers: {},
  charges: {},
};

const stripeLib = sinon.stub().returns(stripe);

const stripeClient = proxyquire('../stripe-client', {
  'stripe': stripeLib,
});

beforeEach(() => {
  stripe.customers.create = sinon.stub();
  stripe.charges.create = sinon.stub();
});

describe('stripe client (unit)', () => {
  it('Should intialize the stripe library with the API key', () => {
    stripeLib.lastCall.args.should.eql([process.env.STRIPE_API_KEY])
  });

  describe('stripeClient.addCustomerWithPaymentSource', () => {
    it('Should create a customer on Stripe', () => {
      const customer = { id: 'C1', email: 'nobody@xmail.com', name: 'bob' };
      const payment = {
        type: 'card',
        details: { cvc: 222, expiry: '02/2020', number: '4000 0566 5566 5556' },
      };

      const createdCustomer = { id: '0123456789' };

      stripe.customers.create.returns(Promise.resolve(createdCustomer));

      return stripeClient.addCustomerWithPaymentSource(customer, payment)
        .then(() => {
          const expectedArgs = [{
            id: customer.id,
            email: customer.email,
            description: customer.name,
            source: {
              exp_month: '02',
              exp_year: '2020',
              number: '4000056655665556',
              object: payment.type,
              cvc: payment.details.cvc,
            },
          }];

          stripe.customers.create.lastCall.args.should.eql(expectedArgs);
        });
    });

    it('Should return the created customer\'s Stripe ID', () => {
      const customer = { id: 'C1', email: 'nobody@xmail.com', name: 'bob' };
      const payment = {
        type: 'card',
        details: { cvc: 222, expiry: '02/2020', number: '4000 0566 5566 5556' },
      };

      const createdCustomer = { id: '0123456789' };

      stripe.customers.create.returns(Promise.resolve(createdCustomer));

      return stripeClient.addCustomerWithPaymentSource(customer, payment)
        .then(result => result.should.equal(createdCustomer.id));
    });

  });

  describe('stripeClient.addCharge', () => {
    it('Should create a charge on Stripe', () => {
      const product = { price: 3.99 };
      const customerId = '0123456789';

      stripe.charges.create.returns(Promise.resolve());

      return stripeClient.addCharge(product, customerId)
        .then(() => {
          const expectedArgs = [{
            amount: 399,
            currency: 'GBP',
            customer: customerId,
          }];

          stripe.charges.create.lastCall.args.should.eql(expectedArgs);
        });
    });

  });

});
