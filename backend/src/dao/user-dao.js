import Lecturer from "../schema/lecturerSchema.js";
import User from "../schema/userSchema.js";
import { accessCodes } from "../test/userDataSample.js";
import Course from "../schema/courseSchema.js";
import { calculateGPA } from "../Utils/GPA_Calculation/GPA-Calculation.js";

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    const lecturer = await Lecturer.findOne({ email: email });
    return user || lecturer;
  } catch (error) {
    return { error: error.message };
  }
};
export const authenticateUser = async (data) => {
  const { email, password } = data;

  console.log("Function called authenticateUser", email, password);

  // Fetch user (either Student or Lecturer)
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: `${email} not found` };
  }

  console.log("User role:", user.role, user._id);

  // Validate password
  const isMatch = await user.comparePassword(password);

  if (isMatch) {
    const result = {
      token: await user.createAccessToken(),
      user: user,
      status: user.role,
    };

    // Check if user is a student
    if (user.role === "STUDENT") {
      // Fetch user with courses
      const gpa = await calculateGPA(user._id);

      // Process completed subjects

      result.gpa = gpa;
    }

    return { success: result };
  } else {
    return { error: "Invalid password" };
  }
};

// ///////////////////////
// User Registration
// ///////////////////////
export const userRegistration = async (data) => {
  const { name, email, mobile_number, gender, password, accesscode } = data;
  console.log(name, email, mobile_number, gender, password, accesscode);

  try {
    const isUserExist = await getUserByEmail(email);
    if (isUserExist) {
      return { error: `${email} already exists` };
    }

    const matchingAccessCode = accessCodes.codes.find(
      (code) => code.accessCode === accesscode
    );

    if (!matchingAccessCode) {
      return {
        error: `Access code ${accesscode} does not exist in admin data.`,
      };
    }

    if (matchingAccessCode.email !== email) {
      return {
        error: `Email ${email} does not match admin data for access code ${accesscode}.`,
      };
    }

    let role;
    let degreeProgram;
    let Model;
    let teachingSubjects = [];

    if (accesscode.startsWith("L123")) {
      role = "LECTURER";
      Model = Lecturer;

      // Align teaching subjects with admin data
      if (matchingAccessCode.teachingSubjects) {
        teachingSubjects = await Promise.all(
          matchingAccessCode.teachingSubjects.map(async (subject) => {
            // Check if the course exists in the database or create it
            let course = await Course.findOne({
              courseCode: subject.courseCode,
            });
            if (!course) {
              course = await Course.create({
                courseCode: subject.courseCode,
                courseName: subject.courseName,
              });
            }
            return course._id; // Store the course's ObjectId
          })
        );
      } else {
        return {
          error: `No teaching subjects defined for access code ${accesscode}.`,
        };
      }
    } else if (accesscode.startsWith("s456")) {
      role = "STUDENT";
      degreeProgram = "BSE";
      Model = User;
    } else {
      return { error: "Invalid access code prefix." };
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
      teachingSubjects: role === "LECTURER" ? teachingSubjects : undefined,
    };

    await Model.create(savedata);
    return { success: "User created successfully with verified access code." };
  } catch (error) {
    return { error: `${error.message}` };
  }
};
