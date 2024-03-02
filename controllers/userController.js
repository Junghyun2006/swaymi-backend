// /backend/controllers/userController.js
const { getDb } = require("../config/mongodb");
const bcrypt = require("bcryptjs");

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

//

const registerUser = async (req, res) => {
  try {
    const db = getDb();
    const { username, email, password } = req.body;

    console.log(req.body)

    // Validate user input...

    // Check if user already exists
    const userExists = await db.collection('users').findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user into the database
    const newUser = await db.collection('users').insertOne({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created', userId: newUser.insertedId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// You can add more user-related functions here

module.exports = {
  getUsers,
  registerUser
};
