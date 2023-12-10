const express = require("express");
const routes = express();
const { login, register, getMe, logout } = require("../controllers/auth");

routes.post("/register", register);
routes.post("/login", login);
routes.get("/me", getMe);
routes.delete("/logout", logout);

module.exports = routes;
