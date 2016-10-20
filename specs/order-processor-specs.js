'use strict';

const proxyquire = require('proxyquire');
const should = require('should');
const sinon = require('sinon');

const stripeClient = {};

const orderProcessor = proxyquire('../order-processor', {
  './stripe-client': stripeClient,
});

beforeEach(() => {
  stripeClient.addCustomerWithPaymentSource = sinon.stub();
})

describe('orderProcessor.process (unit)', () => {
  it('Should add a customer with payment source on stripe', () => {
    const customer = { id: 'C1' };
    const payment = {
      type: 'card',
      details: { cvc: 222 },
    };

    const order = {
      key: 'O1',
      val: () => {
        return { customer, payment };
      },
    };

    orderProcessor.process(order);

    stripeClient.addCustomerWithPaymentSource.called.should.be.true();
    stripeClient.addCustomerWithPaymentSource.lastCall.args.should.eql([customer, payment]);

  });

});
