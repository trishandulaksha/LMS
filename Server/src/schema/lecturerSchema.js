import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Lecturer Schema
const lecturerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["LECTURER"],
    default: "LECTURER",
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  mobile_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  teachingSubjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects", // Reference to the Subject model
    },
  ],
});

// Password hashing middleware
lecturerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create Access Token Method
lecturerSchema.methods.createAccessToken = async function () {
  try {
    return await jwt.sign({ userId: this._id }, process.env.JWT_SCRT_KEY, {
      expiresIn: "30m",
    });
  } catch (error) {
    return error;
  }
};

// Compare Password Method
lecturerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Lecturer = mongoose.model("Lecturer", lecturerSchema);
export default Lecturer;
