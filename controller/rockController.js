const { validationResult } = require("express-validator");
const { Rock } = require("../model/rock");

// Create a new rock
exports.createRock = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, color } = req.body;
    const rock = await Rock.create({ name, color, userId: req.user.id });
    res.status(201).json(rock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all rocks for the authenticated user
exports.getAllRocks = async (req, res) => {
  try {
    const rocks = await Rock.findAll({ where: { userId: req.user.id } });
    res.status(200).json(rocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a rock by ID
exports.updateRock = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const rock = await Rock.findOne({ where: { id, userId: req.user.id } });
    if (!rock) {
      return res.status(404).json({ message: "Rock not found" });
    }

    // Update only fields that are provided
    if (name) rock.name = name;
    if (color) rock.color = color;

    await rock.save();
    res.status(200).json(rock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a rock by ID
exports.deleteRock = async (req, res) => {
  try {
    const { id } = req.params;
    const rock = await Rock.findOne({ where: { id, userId: req.user.id } });
    if (!rock) {
      return res.status(404).json({ message: "Rock not found" });
    }

    await rock.destroy();
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
