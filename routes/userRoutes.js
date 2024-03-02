// /backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");

// Fetch all users
router.get("/", getUsers);

// Add more routes as needed...

module.exports = router;
