// /backend/config/db.js
const { MongoClient } = require("mongodb");

let dbConnection;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    dbConnection = client.db(process.env.DB_NAME);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1);
  }
};

const getDb = () => {
  if (!dbConnection) {
    throw Error("Database not initialized");
  }
  return dbConnection;
};

module.exports = { connectDB, getDb };
