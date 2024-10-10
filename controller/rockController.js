const { validationResult } = require("express-validator");
const { Rock } = require("../model");
const { use } = require("bcrypt/promises");

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

// Get rock by ID, but only if it belongs to the authenticated user
exports.getRockById = async (req, res) => {
  try {
    const rockId = req.params.id;
    const userId = req.user.id;
    console.log(userId);

    const rock = await Rock.findOne({
      where: {
        id: rockId,
        userId: userId,
      },
    });

    if (!rock) {
      return res.status(404).json({
        message: "Rock not found or you do not have permission to view it.",
      });
    }

    // Return rock details if the user owns it
    return res.status(200).json({
      id: rock.id,
      name: rock.name,
      color: rock.color,
      status: rock.status,
      createdAt: rock.createdAt,
      updatedAt: rock.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching rock:", error);
    return res.status(500).json({ message: "Server error" });
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

    if (name) rock.name = name;
    if (color) rock.color = color;

    await rock.save();
    res.status(200).json(rock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Pet rock
exports.petRock = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const rock = await Rock.findOne({ where: { id, userId } });

    if (!rock) {
      return res.status(404).json({
        message: "Rock not found or you do not have permission to pet it.",
      });
    }

    rock.status = "The rock is now happy (i think)";
    res.status(200).json(rock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a rock by ID
exports.deleteRock = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const rock = await Rock.findOne({ where: { id, userId } });

    if (!rock) {
      return res.status(404).json({
        message: "Rock not found or you do not have permission to delete it.",
      });
    }
    await rock.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting rock:", error);
    return res.status(500).json({ error: error.message });
  }
};
