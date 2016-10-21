'use strict';

const firebaseClient = require('./lib/firebase-client');

const orderData = [
  {
    key: 'O1',
    order: {
      "customer": {
        "id": "C1",
        "name": "John Smith",
        "email": "john@smith.com"
      },
      "product": {
        "id": "I1",
        "name": "Item",
        "price": 3.99
      },
      "payment": {
        "type": "card",
        "details": {
          "number": "4000 0566 5566 5556",
          "expiry": "02/2020",
          "cvc": 222,
        },
      },
    },
  },
  {
    key: 'O2',
    order: {
      "customer": {
        "id": "C2",
        "name": "Jane Smith",
        "email": "jane@smith.com"
      },
      "product": {
        "id": "I1",
        "name": "Item",
        "price": 3.99
      },
      "payment": {
        "type": "card",
        "details": {
          "number": "4000 0566 5566 5556",
          "expiry": "02/2020",
          "cvc": 222,
        },
      },
    },
  },
];

orderData.forEach(data => {
  firebaseClient.ref(`orders/${data.key}`).set(data.order)
    .then(() => {
      console.log('Succesfully added order ' + data.key);
    })
});
