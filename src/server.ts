// Dependencies
import express from "express";
import { connectDB } from "./config/mongodb";
import userRoutes from "./routes/userRoutes"; // Assuming userRoutes is using export default
import dotenv from "dotenv";

// Initialize dotenv
dotenv.config({ path: ".env.local" });

// Constants
const port: number = parseInt(process.env.PORT || "3001", 10);

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