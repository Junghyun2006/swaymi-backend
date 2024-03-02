import express from "express";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { getUsers, registerUser } from "../controllers/userController";

const router: Router = express.Router();

// Fetch all users
router.get("/", getUsers);

// Register a new user
router.post(
  "/register",
  [
    body("username", "Username is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password must be 6 or more characters long").isLength({
      min: 6,
    }),
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Validation result processing middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // No validation errors, proceed to the controller
  },
  registerUser
);

export default router;
