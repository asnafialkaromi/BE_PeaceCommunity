const express = require("express");
const app = express();

const auth = require("./auth");
const reports = require("./reports");
const users = require("./users");

const apiUrl = "/api/v1";

app.use(apiUrl, auth);
app.use(apiUrl, reports);
app.use(apiUrl, users);

module.exports = app;
