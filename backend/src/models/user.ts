import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// user type is created for the sake of typescript
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// middleware to encrypt the password
// runs "pre" (before) "save" (saving) the document
// Checks if the "password" field of the current document (this) has been modified. This ensures that the password is only hashed if it has been changed or is new.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// creating a User model with the defined user schema, with type UserType
const User = mongoose.model<UserType>("User", userSchema);
// mongoose creates a collection with lowercased plural version of the model name => users; can be viewed in mongodb atlas

export default User;
