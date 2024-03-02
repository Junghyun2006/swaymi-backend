// /backend/controllers/userController.js
const { getDb } = require("../config/mongodb");

const getUsers = async (req, res) => {
  console.log("fetching users")
  const db = getDb();
  try {
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// You can add more user-related functions here

module.exports = {
  getUsers,
};
