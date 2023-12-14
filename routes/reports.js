const express = require("express");
const routes = express();
const {
  getReports,
  createReport,
  updateReport,
} = require("../controllers/reports");
const { verifyUser, adminOnly } = require("../middleware/authUser");

routes.get("/reports", verifyUser, getReports);
routes.post("/reports", createReport);
routes.patch("/reports", verifyUser, adminOnly, updateReport);

module.exports = routes;
