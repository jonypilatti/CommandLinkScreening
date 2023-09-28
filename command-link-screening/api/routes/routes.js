const express = require("express");
const router = express.Router();
const routesForm = require("./routesForm");
router.use("/", routesForm);

module.exports = router;
