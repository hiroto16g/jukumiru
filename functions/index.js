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

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
})

exports.ssr = functions.https.onRequest(app)
