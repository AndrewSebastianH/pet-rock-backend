const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const rockController = require("../controller/rockController");
const isAuthenticated = require("../middleware/isAuthenticated");

// Create a new rock
router.post(
  "/",
  isAuthenticated,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("color").trim().notEmpty().withMessage("Color is required"),
  ],
  rockController.createRock
);

// Pet rock
router.put("/pet/:id", isAuthenticated, rockController.petRock);

// Get all rocks for the authenticated user
router.get("/", isAuthenticated, rockController.getAllRocks);

// Get rock by id
router.get("/:id", isAuthenticated, rockController.getRockById);

// Update a rock by ID
router.put(
  "/:id",
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
router.delete("/:id", isAuthenticated, rockController.deleteRock);

module.exports = router;
