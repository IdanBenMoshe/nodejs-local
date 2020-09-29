const admin = require('firebase-admin');
const serviceAccount = require('../pooloff-408de-firebase-adminsdk-dv6q0-865231aca8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pooloff-408de.firebaseio.com"
});

module.exports = admin;
