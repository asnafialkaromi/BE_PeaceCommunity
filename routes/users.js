const express = require("express");
const routes = express();
const { getUser, deleteUser } = require("../controllers/user");
const router = express.Router();

routes.get("/users", getUser);
routes.delete("/user/:uuid", deleteUser);

router.get("/users", (req, res) => {
  // Set custom headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Your route logic goes here
  getUser(req, res);
});

module.exports = router;
