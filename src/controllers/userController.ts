import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getDb } from "../config/mongodb";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  console.log("fetching users");
  const db = getDb();
  try {
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = getDb();
    const { username, email, password } = req.body;

    console.log(req.body);

    // Validate user input...

    // Check if user already exists
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user into the database
    const newUser = await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", userId: newUser.insertedId });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export { getUsers, registerUser };
