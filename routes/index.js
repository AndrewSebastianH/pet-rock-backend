const express = require("express");
const router = express.Router();

const pageRoutes = require("./pageRoutes");
const rockRoutes = require("./rockRoutes");

router.use("/auth", pageRoutes);
router.use("/rocks", rockRoutes);

module.exports = router;
