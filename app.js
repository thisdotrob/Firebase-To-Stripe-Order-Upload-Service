'use strict';

const firebaseClient = require('./lib/firebase-client');
const orderProcessor = require('./lib/order-processor');

firebaseClient.ref('orders').limitToLast(1).on('child_added', orderProcessor.process);
