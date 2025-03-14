import React, { useState, useEffect } from "react";
import SubjectSelector from "../../../Component/SubjectSelector/SubjectSelector";
import StudentsTable from "../../../Component/StudentTable/StudentTable";
import ActionButtons from "../../../Component/ActionButton/ActionButton";
import {
  fetchSubjectsAndStudents,
  saveOrUpdateMarks,
} from "../../../API/LecturerAPI";
import { UseDataContexts } from "../../../ContextAPI/LoginAndMarksContext";

const LecturerDashboard = () => {
  const { marksData, user, setMarksData } = UseDataContexts();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMarks, setEditedMarks] = useState({});
  const [originalMarks, setOriginalMarks] = useState({});
  const [finalMarks, setFinalMarks] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidUser = () =>
    user &&
    user.success &&
    user.success.user &&
    user.success.user._id &&
    user.success.user.role === "LECTURER";

  useEffect(() => {
    const loadSubjectsAndStudents = async () => {
      if (!isValidUser()) {
        console.error("Invalid or missing user data.");
        return;
      }

      try {
        setLoading(true);
        const { _id } = user.success.user;
        const data = await fetchSubjectsAndStudents(_id, setMarksData);
        setSubjects(data || []);
      } catch (error) {
        console.error("Failed to fetch subjects and students:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubjectsAndStudents();
  }, [user, setMarksData]);

  useEffect(() => {
    if (selectedSubject && subjects.length > 0) {
      const subjectData = subjects.find(
        (subject) => subject?.subject?._id === selectedSubject
      );
      const studentList = subjectData?.students || [];
      setStudents(studentList);

      const marks = studentList.reduce((acc, student) => {
        if (student && student.student && student.student._id) {
          acc[student.student._id] = { ...student.marks };
        }
        return acc;
      }, {});

      setEditedMarks(marks);
      setOriginalMarks(JSON.parse(JSON.stringify(marks)));

      // Compute final marks and eligibility
      computeFinalMarksAndEligibility(marks);
    }
  }, [selectedSubject, subjects, marksData]);

  const computeFinalMarksAndEligibility = (marks) => {
    const finalMarksObj = {};
    const eligibilityObj = {};

    console.log(marks);

    Object.entries(marks).forEach(([studentId, studentMarks]) => {
      // Example: Compute final mark as the average of all marks
      const totalMarks = Object.values(studentMarks).reduce(
        (sum, mark) => sum + (parseFloat(mark) || 0),
        0
      );
      const numSubjects = Object.values(studentMarks).length;
      const finalMark = numSubjects > 0 ? totalMarks / numSubjects : 0;

      // Determine eligibility (e.g., final mark >= 50)
      const isEligible = finalMark >= 50;

      finalMarksObj[studentId] = finalMark;
      eligibilityObj[studentId] = isEligible ? "Eligible" : "Not Eligible";
    });

    setFinalMarks(finalMarksObj);
    setEligibility(eligibilityObj);
  };

  useEffect(() => {
    computeFinalMarksAndEligibility(editedMarks);
  }, [editedMarks, marksData]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMarks(JSON.parse(JSON.stringify(originalMarks)));
  };

  const handleSave = async () => {
    if (!isValidUser()) {
      alert("User validation failed. Cannot save marks.");
      return;
    }

    try {
      const studentMarks = Object.entries(editedMarks).map(([id, marks]) => ({
        studentId: id,
        marks,
      }));

      const { _id } = user.success.user;
      await saveOrUpdateMarks(_id, selectedSubject, studentMarks, setMarksData);
      setOriginalMarks(JSON.parse(JSON.stringify(editedMarks)));
      setIsEditing(false);
      window.location.reload();
      alert("Marks updated successfully!");
    } catch (error) {
      console.error("Failed to save marks:", error);
      alert("Failed to save marks. Please try again.");
    }
  };

  const handleChange = (studentId, field, value) => {
    setEditedMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  if (!isValidUser()) {
    return <p>Loading user data or unauthorized access...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Lecturer Dashboard</h1>
      {loading ? (
        <p>Loading subjects...</p>
      ) : (
        <>
          <SubjectSelector
            subjects={subjects.map((s) => ({
              id: s?.subject?._id,
              title: s?.subject?.courseName || "Unknown Subject",
            }))}
            setSelectedSubject={setSelectedSubject}
          />
          {selectedSubject && (
            <div>
              <StudentsTable
                students={students.map((s) => ({
                  id: s?.student?._id || "Unknown",
                  name: s?.student?.name || "Unknown Name",
                  marks: editedMarks[s?.student?._id] || {},
                  finalMark: finalMarks[s?.student?._id] || 0,
                  eligibility: eligibility[s?.student?._id] || "Not Available",
                }))}
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <ActionButtons
                isEditing={isEditing}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LecturerDashboard;
