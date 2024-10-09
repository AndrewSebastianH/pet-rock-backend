const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const rockController = require("../controller/rockController");
const isAuthenticated = require("../middleware/isAuthenticated");

// Create a new rock
router.post(
  "/rocks",
  isAuthenticated,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("color").trim().notEmpty().withMessage("Color is required"),
  ],
  rockController.createRock
);

// Get all rocks for the authenticated user
router.get("/rocks", isAuthenticated, rockController.getAllRocks);

// Update a rock by ID
router.put(
  "/rocks/:id",
  isAuthenticated,
  [
    body("name")
      .trim()
      .optional()
      .notEmpty()
      .withMessage("Name cannot be empty"),
    body("color")
      .trim()
      .optional()
      .notEmpty()
      .withMessage("Color cannot be empty"),
  ],
  rockController.updateRock
);

// Delete a rock by ID
router.delete("/rocks/:id", isAuthenticated, rockController.deleteRock);

module.exports = router;
