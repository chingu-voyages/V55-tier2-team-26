const express = require('express')
const app = express()

app.use(express.json())

// Without middleware: new request -> run route hanlder
// With middleware: new requrest -> do something -> run route handler

module.exports = app