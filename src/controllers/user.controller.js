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

module.exports = {
  createUser
};