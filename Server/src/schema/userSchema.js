import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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

userSchema.methods.createAccessToken = async function () {
  try {
    const token = await jwt.sign(
      {
        userId: this.Id,
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
const User = mongoose.model("users", userSchema);
export default User;
