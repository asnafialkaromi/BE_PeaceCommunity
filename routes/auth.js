const express = require("express");
const routes = express();
const { login, register, getMe, logout } = require("../controllers/auth");

routes.post("/register", register);
routes.post("/login", login);
routes.get("/me", getMe);
routes.post("/logout", logout);

module.exports = routes;
