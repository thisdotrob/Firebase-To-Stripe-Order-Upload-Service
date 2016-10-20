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
  stripeClient.addCharge = sinon.stub();
})

describe('orderProcessor.process (unit)', () => {
  it('Should add a customer with payment source on stripe', () => {
    const customer = { id: 'C1' };
    const payment = { type: 'card', details: { cvc: 222 } };
    const product = { price: 3.99 };

    const order = {
      key: 'O1',
      val: () => {
        return { customer, product, payment };
      },
    };

    stripeClient.addCustomerWithPaymentSource.returns(Promise.resolve());
    stripeClient.addCharge.returns(Promise.resolve());

    return orderProcessor.process(order)
      .then(() => {
        stripeClient.addCustomerWithPaymentSource.called.should.be.true();
        stripeClient.addCustomerWithPaymentSource.lastCall.args.should.eql([customer, payment]);
      });

  });

  it('Should add a charge on stripe', () => {
    const customer = { id: 'C1' };
    const payment = { type: 'card', details: { cvc: 222 } };
    const product = { price: 3.99 };

    const order = {
      key: 'O1',
      val: () => {
        return { customer, product, payment };
      },
    };

    const customerId = '123456789';

    stripeClient.addCustomerWithPaymentSource.returns(Promise.resolve(customerId));
    stripeClient.addCharge.returns(Promise.resolve());

    return orderProcessor.process(order)
      .then(() => {
        stripeClient.addCharge.called.should.be.true();
        stripeClient.addCharge.lastCall.args.should.eql([product, customerId]);
      });

  });

});
