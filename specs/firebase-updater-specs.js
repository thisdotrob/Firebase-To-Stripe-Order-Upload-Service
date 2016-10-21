'use strict';

const proxyquire = require('proxyquire').noCallThru();
const should = require('should');
const sinon = require('sinon');

const firebaseClient = {};

const firebaseUpdater = proxyquire('../lib/firebase-updater', {
  './firebase-client': firebaseClient,
});

beforeEach(() => firebaseClient.ref = sinon.stub());

describe('firebaseUpdater.updateOrderWithStripeChargeId (unit)', () => {
  it('Should get a reference to the order key provided', () => {
    const orderKey = 'O1';
    const chargeId = '0987654321';

    firebaseClient.ref.returns({
      set: () => Promise.resolve(),
    });

    return firebaseUpdater.updateOrderWithStripeChargeId(orderKey, chargeId)
      .then(() => {
        firebaseClient.ref.called.should.be.true();
        firebaseClient.ref.lastCall.args.should.eql([`orders/${orderKey}/stripeChargeId`]);
      });
  });

  it('Should update the reference with the charge ID', () => {
    const orderKey = 'O1';
    const chargeId = '0987654321';

    const set = sinon.stub().returns(Promise.resolve());

    firebaseClient.ref.returns({ set });

    return firebaseUpdater.updateOrderWithStripeChargeId(orderKey, chargeId)
      .then(() => {
        set.called.should.be.true();
        set.lastCall.args.should.eql([chargeId]);
      });
  });

});

describe('firebaseUpdater.updateOrderWithStripeCustomerId (unit)', () => {
  it('Should get a reference to the order key provided', () => {
    const orderKey = 'O1';
    const customerId = '0987654321';

    firebaseClient.ref.returns({
      set: () => Promise.resolve(),
    });

    return firebaseUpdater.updateOrderWithStripeCustomerId(orderKey, customerId)
      .then(() => {
        firebaseClient.ref.called.should.be.true();
        firebaseClient.ref.lastCall.args.should.eql([`orders/${orderKey}/customer/stripeCustomerId`]);
      });
  });

  it('Should update the reference with the customer ID', () => {
    const orderKey = 'O1';
    const customerId = '0987654321';

    const set = sinon.stub().returns(Promise.resolve());

    firebaseClient.ref.returns({ set });

    return firebaseUpdater.updateOrderWithStripeCustomerId(orderKey, customerId)
      .then(() => {
        set.called.should.be.true();
        set.lastCall.args.should.eql([customerId]);
      });
  });

});
