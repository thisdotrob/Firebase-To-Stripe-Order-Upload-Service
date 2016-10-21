# Firebase To Stripe Order Upload Service

This is a minimal NodeJS service which adds a charge and customer to Stripe for every raw order added to a Firebase database. The order in the Firebase database is then updated with the charge and customer IDs received from Stripe.

## Usage

The service was written to run on node v6.8.1.

The following environment variables must be set:

- ```FIREBASE_API_KEY```: Your API key for firebase
- ```FIREBASE_APP_NAME```: The name of your Firebase app, which forms part of the database url (e.g. https://experiment-123.firebaseio.com would be 'experiment-123').
- ```FIREBASE_SENDER_ID```: The sender ID for your Firebase database.
- ```STRIPE_API_KEY```: Your API key for Stripe

Additionally, your Firebase database must allow public access by setting the config as follows in the web console:
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

To start the service, first clone this repo, install dependencies (```npm i```) and then run it (```node app.js```).

Any orders subsequently added to the Firebase database as a child to an initial ```orders``` node, in the following format, will then be processed:

```
"Order1": {
  "customer": {
    "name": "Bob Jones",
    "email": "bob@jones.com"
  },
  "product": {
    "id": "I1",
    "name": "Item",
    "price": 21.99
  },
  "payment": {
    "type": "card",
    "details": {
      "number": "4123 5234 6345 7456",
      "expiry": "10/2018",
      "cvc": 333
    }
  }
}
```

A test script is included which will add a couple of orders to the Firebase database to test the service is working.

To run the unit tests, run ```npm t```.
