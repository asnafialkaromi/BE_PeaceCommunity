const express = require("express");
const routes = express();
const { getUser, deleteUser } = require("../controllers/user");

routes.get("/users", getUser);
routes.delete("/user/:uuid", deleteUser);

module.exports = routes;
