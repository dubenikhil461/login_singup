import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Fixed
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // Fixed
      trim: true,
    },
    email: {
      type: String,
      required: true, // Fixed
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Hash Password Before Saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Fixed hashing
  }
  next();
});

// Compare Password Method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Correct Export
const User = mongoose.model("User", userSchema);
export default User;
