import Lecturer from "../schema/lecturerSchema.js";

// DAO to get all courses taught by lecturers
export const getLecturerCourses = async () => {
  const lecturers = await Lecturer.find().populate("teachingSubjects");
  return lecturers.map((lecturer) => ({
    lecturerId: lecturer._id,
    name: lecturer.name,
    teachingSubjects: lecturer.teachingSubjects,
  }));
};
