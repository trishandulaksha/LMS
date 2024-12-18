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
  const { user, marksData, setMarksData } = UseDataContexts();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMarks, setEditedMarks] = useState({});
  const [originalMarks, setOriginalMarks] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("LecturerDashboard function is called", user?.success.user._id);

  // Fetching subjects and students
  useEffect(() => {
    const loadSubjectsAndStudents = async () => {
      if (!user?.success?.user?._id && !user?.success?.user?.role === "STUDENT")
        return;
      // Ensure user data is available
      try {
        setLoading(true);
        const data = await fetchSubjectsAndStudents(
          user.success.user._id,
          setMarksData
        );
        setSubjects(data || []);
      } catch (error) {
        console.error("Failed to load subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubjectsAndStudents();
  }, [user?.success?.user?._id]); // Trigger when user data is updated

  // When selectedSubject changes, update students and marks
  useEffect(() => {
    if (selectedSubject && subjects.length > 0) {
      const subjectData = subjects.find(
        (subject) => subject.subject._id === selectedSubject
      );
      const studentList = subjectData?.students || [];
      setStudents(studentList);

      // Initialize marks for the selected subject
      const marks = studentList.reduce((acc, student) => {
        acc[student.student._id] = { ...student.marks };
        return acc;
      }, {});

      setEditedMarks(marks);
      setOriginalMarks(JSON.parse(JSON.stringify(marks))); // Deep copy for cancel operation
    }
  }, [selectedSubject, subjects]);

  // Handle editing state
  const handleEdit = () => setIsEditing(true);

  // Handle cancel operation and revert marks
  const handleCancel = () => {
    setIsEditing(false);
    setEditedMarks(JSON.parse(JSON.stringify(originalMarks)));
  };

  // Handle saving marks
  const handleSave = async () => {
    try {
      const studentMarks = Object.entries(editedMarks).map(([id, marks]) => ({
        studentId: id,
        marks,
      }));

      await saveOrUpdateMarks(
        user?.success.user._id, // Use correct user ID
        selectedSubject,
        studentMarks,
        setMarksData
      );
      setOriginalMarks(JSON.parse(JSON.stringify(editedMarks))); // Sync current state
      setIsEditing(false);
      alert("Marks updated successfully!");
    } catch (error) {
      console.error("Failed to save marks:", error);
      alert("Failed to save marks. Please try again.");
    }
  };

  // Handle individual student mark changes
  const handleChange = (studentId, field, value) => {
    setEditedMarks((prev) => {
      const updatedStudentMarks = {
        ...prev[studentId],
        [field]: value,
      };

      return { ...prev, [studentId]: updatedStudentMarks };
    });
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Lecturer Dashboard</h1>
      {loading ? (
        <p>Loading subjects...</p>
      ) : (
        <>
          <SubjectSelector
            subjects={subjects.map((s) => ({
              id: s.subject._id,
              title: s.subject.courseName,
            }))}
            setSelectedSubject={setSelectedSubject}
          />
          {selectedSubject && (
            <div>
              <StudentsTable
                students={students.map((s) => ({
                  id: s.student._id,
                  name: s.student.name,
                  marks: editedMarks[s.student._id] || {},
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
