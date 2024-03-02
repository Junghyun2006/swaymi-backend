require("dotenv").config({ path: ".env.local" });
const express = require("express");
const { connectDB } = require("./config/mongodb");
const userRoutes = require("./routes/userRoutes");

const port = parseInt(process.env.PORT, 10) || 3001;
connectDB();
// const dev = process.env.NODE_ENV !== "production";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
