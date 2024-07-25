import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// register new user
// /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
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

    try {
      // find if a user exists for the email address
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // create and save a user from the received request
      user = new User(req.body);
      await user.save();

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

      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Somethinf went wrong" });
    }
  }
);

export default router;
