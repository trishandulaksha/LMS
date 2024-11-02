import Lecturer from "../schema/lecturerSchema.js";
import User from "../schema/userSchema.js";
import { accessCodes } from "../test/userDataSample.js";
import {
  getEligibleSubjects,
  getInitialRecommendations,
  getMarksForUser,
  getUserWithCourses,
} from "./recomendSubject-dao.js";

// Find user detail using email
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    const lecturer = await Lecturer.findOne({ email: email });
    return user || lecturer;
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

  console.log("User role:", user.role, user._id);

  const isMatch = await user.comparePassword(password);

  if (isMatch) {
    const result = {
      token: await user.createAccessToken(),
      user: user,
      status: user.role,
    };

    if (user.role === "STUDENT") {
      const userWithCourses = await getUserWithCourses(user._id);
      console.log(userWithCourses);
      if (userWithCourses.enrolledCourses.length === 0) {
        // Fetch initial recommendations for first-time enrollment
        const recommendedSubjects = await getInitialRecommendations();
        result.recommendedSubjects = recommendedSubjects;
        result.marksData = null; // No marks data for first-time enrollment
      } else {
        // Fetch marks and determine eligible subjects based on prerequisites and eligibility
        const marksData = await getMarksForUser(user._id);

        // Map to extract completed subjects with eligibility and pass status
        const completedSubjects = marksData.map((mark) => ({
          subject: mark.subject.courseCode,
          passed: mark.passed,
          isEligibleForFinal: mark.isEligibleForFinal,
        }));

        // Fetch eligible subjects for next semester
        const eligibleSubjects = await getEligibleSubjects(
          userWithCourses,
          completedSubjects
        );

        result.recommendedSubjects = eligibleSubjects;
        result.marksData = marksData;
      }
    }

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
    const isUserExist = await getUserByEmail(email);
    if (isUserExist) {
      return { error: `${email} already exists` };
    }

    let role;
    let degreeProgram;
    let Model;

    if (accesscode.startsWith("L123")) {
      role = "LECTURER";
      Model = Lecturer;
    } else if (accesscode.startsWith("s456")) {
      role = "STUDENT";
      degreeProgram = "BSE";
      Model = User;
    } else {
      return { error: "Invalid access code prefix." };
    }

    const matchingAccessCode = accessCodes.codes.find(
      (code) => code.accessCode === accesscode && code.email === email
    );

    if (!matchingAccessCode) {
      return { error: `Invalid access code` };
    }

    const savedata = {
      _id: accesscode,
      name,
      email,
      role,
      gender,
      mobile_number,
      password,
      degreeProgram,
      teachingSubjects: role === "LECTURER" ? [] : undefined,
    };

    await Model.create(savedata);
    return { success: "User created successfully" };
  } catch (error) {
    return { error: `${error.message}` };
  }
};
