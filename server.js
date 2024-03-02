// Dependencies
const express = require("express");
const { connectDB } = require("./config/mongodb");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config({ path: ".env.local" });

// Constants
const port = parseInt(process.env.PORT, 10) || 3001;

// Connect to Database
connectDB();

// Create Express App
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/users", userRoutes);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});