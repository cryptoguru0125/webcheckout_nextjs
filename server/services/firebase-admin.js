const admin = require('firebase-admin');
const config = require('../config')
let serviceAccount;

if (config.IS_PRODUCT) {
  serviceAccount = require("../../bloom-prod-2d5c5-firebase-adminsdk-1hxf5-b468a2bb77.json");
} else {
  serviceAccount = require("../../test_adminsdk.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports  = admin;