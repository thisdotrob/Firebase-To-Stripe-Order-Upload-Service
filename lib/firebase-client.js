'use strict';

const firebase = require('firebase');

const apiKey = process.env.FIREBASE_API_KEY;
const appName = process.env.FIREBASE_APP_NAME;
const messagingSenderId = process.env.FIREBASE_SENDER_ID;

firebase.initializeApp({
  apiKey,
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId,
});

module.exports = firebase.database();
