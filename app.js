'use strict';

const firebaseClient = require('./firebase-client');
const orderProcessor = require('./order-processor');

firebaseClient.ref('orders').limitToLast(1).on('child_added', orderProcessor.process);
