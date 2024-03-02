// /backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUsers, registerUser } = require("../controllers/userController");

// Fetch all users
router.get("/", getUsers);

// Register a new user
router.post("/register", registerUser);

// Add more routes as needed...

module.exports = router;
