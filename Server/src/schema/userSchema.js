import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const userSchema = new mongoose.Schema({
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
    enum: ["STUDENT", "LECTURER"],
    default: "STUDENT",
  },
  degreeProgram: {
    type: String,
    required: true,
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
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      enrollmentDate: { type: Date, default: Date.now },
      isRepeat: { type: Boolean, default: false },
    },
  ],
});

// HASHED THE PASSWORD BEFORE SAVING (USING MIDDLEWARE)
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Create Access Token Method
userSchema.methods.createAccessToken = async function () {
  try {
    const token = await jwt.sign(
      {
        userId: this._id,
      },
      process.env.JWT_SCRT_KEY,
      {
        expiresIn: "30m",
      }
    );

    return token;
  } catch (error) {
    return error;
  }
};

// Compare Password Method
userSchema.methods.comparePassword = async function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      return resolve(isMatch);
    });
  });
};

// Create User Model
const User = mongoose.model("User", userSchema);
export default User;
