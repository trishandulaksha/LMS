import User from "../schema/userSchema.js";

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
  const { name, email, role, mobile_number, gender, password } = data;
  try {
    const isUserExist = await getUserByEmail(email);

    if (isUserExist) {
      return { error: `${email} already exists` };
    }

    const savedata = {
      name: name,
      email: email,
      role: role ? role : "STUDENT",
      gender: gender,
      mobile_number: mobile_number,
      password: password,
    };

    await User.create(savedata);

    return { success: "User created successfully" };
  } catch (error) {
    return { error: `User creation failed : ${error.message}` };
  }
};
