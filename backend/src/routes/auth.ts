import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// /routes/auth/login
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    // receiving if there are any validation errors for the above checks performed on the attributes
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body; // destructuring

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      //   compare if the password matches in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id }, // Payload: Data you want to encode in the token
        process.env.JWT_SECRET_KEY as string, // Secret key used to sign the token
        { expiresIn: "1d" } // Options: Expiration time for the token
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
