const userRepo = require("../repositories/user.repository");

async function createUser(req, res) {
  try {
    const user = {
      age: req.body.age,
      gender: req.body.gender,
      diseases: req.body.diseases
    };

    await userRepo.createUser(user);

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;

    const user = await userRepo.getUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching user"
    });
  }
}

async function updateUser(req, res) {
  try {
    const affected = await userRepo.updateUser(
      req.params.id,
      req.body
    );

    if (affected === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated"
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
}

async function deleteUser(req, res) {
  try {
    const affected = await userRepo.deleteUser(req.params.id);

    if (affected === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted"
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};