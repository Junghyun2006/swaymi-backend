import { MongoClient } from "mongodb";

let dbConnection;

const connectDB = async (): Promise<void> => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
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

export { connectDB, getDb };
