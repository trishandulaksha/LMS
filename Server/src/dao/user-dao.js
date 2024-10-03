import User from "../schema/userSchema.js";
import { accessCodes } from "../test/userDataSample.js";

// Find user detail using email
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    return { error: error.message };
  }
};

// User Authentication
export const authenticateUser = async (data) => {
  const { email, password } = data;

  console.log("Function called authenticateUser", email, password);
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: `${email} not found` };
  }

  console.log("User role:", user.role);

  const isMatch = await user.comparePassword(password);

  if (isMatch) {
    const result = {
      token: await user.createAccessToken(),
      user: user,
      status: user.role,
    };
    return { success: result };
  } else {
    return { error: "Invalid password" };
  }
};

// User Registration
export const userRegistration = async (data) => {
  const { name, email, mobile_number, gender, password, accesscode } = data;
  console.log(name, email, mobile_number, gender, password, accesscode);
  try {
    // Check if the user already exists
    const isUserExist = await getUserByEmail(email);
    if (isUserExist) {
      return { error: `${email} already exists` };
    }

    // Determine the role based on the access code's first three digits
    let role;
    if (accesscode.startsWith("123")) {
      // Lecturer access code prefix
      role = "LECTURER";
    } else if (accesscode.startsWith("456")) {
      // Student access code prefix
      role = "STUDENT";
    } else {
      return { error: "Invalid access code prefix." };
    }

    // Check if the access code matches the expected value for the determined role
    const matchingAccessCode = accessCodes.codes.find(
      (code) => code.accessCode === accesscode && code.email === email
    );

    if (!matchingAccessCode) {
      return { error: `Invalid access code` };
    }

    // Proceed with user creation if access code is valid
    const savedata = {
      name: name,
      email: email,
      role: role,
      gender: gender,
      mobile_number: mobile_number,
      password: password,
    };

    await User.create(savedata);
    return { success: "User created successfully" };
  } catch (error) {
    return { error: `${error.message}` };
  }
};
