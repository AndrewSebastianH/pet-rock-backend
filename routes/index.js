const express = require("express");
const router = express.Router();

const pageRoutes = require("./pageRoutes");

router.use("/", pageRoutes);

module.exports = router;
