const express = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!'));
exports.app = functions.https.onRequest(app);
