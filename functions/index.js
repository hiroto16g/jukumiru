const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');

const nuxt = new Nuxt({
  buildDir: 'ssr',
  dev: false
});

const app = express()

app.use(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
});

exports.ssr = functions.https.onRequest(app)
