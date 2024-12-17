import React from "react";

const StudentsTable = ({ students, isEditing, handleChange }) => {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Student Marks</h2>
      <table className="w-full border border-collapse border-gray-200 table-auto">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Mini Project</th>
            <th className="p-2 border">CAT Marks</th>
            <th className="p-2 border">TMA Marks</th>
            <th className="p-2 border">Lab Marks</th>
            <th className="p-2 border">Final Marks</th>
            <th className="p-2 border">Eligibility Marks</th>
            <th className="p-2 border">Eligible for Final Exam</th>
            <th className="p-2 border">Passed Status (Eligibility Marks)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            // Get the eligibility marks directly from the student marks
            const eligibilityMarks = student.marks?.eligibilityMarks || 0;
            const isEligibleForFinal = eligibilityMarks >= 50; // Assume eligibility threshold is 50
            const isPassedStatus = eligibilityMarks >= 40; // Assume passed threshold is 40

            return (
              <tr key={student.id}>
                {/* Student Name */}
                <td className="p-2 border">{student.name}</td>

                {/* Mini Project Marks */}
                <td className="p-2 border">
                  {isEditing ? (
                    <input
                      type="number"
                      value={student.marks?.miniProject || ""}
                      onChange={(e) =>
                        handleChange(student.id, "miniProject", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    student.marks?.miniProject || 0
                  )}
                </td>

                {/* CAT Marks */}
                <td className="p-2 border">
                  {student.marks?.catMarks?.map((cat, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <span className="mr-2">{cat.label}:</span>
                      {isEditing ? (
                        <input
                          type="number"
                          value={cat.mark || ""}
                          onChange={(e) => {
                            const updatedCATMarks = [...student.marks.catMarks];
                            updatedCATMarks[index] = {
                              ...updatedCATMarks[index],
                              mark: e.target.value,
                            };
                            handleChange(
                              student.id,
                              "catMarks",
                              updatedCATMarks
                            );
                          }}
                          className="w-16 p-1 border rounded"
                        />
                      ) : (
                        cat.mark
                      )}
                    </div>
                  ))}
                </td>

                {/* TMA Marks */}
                <td className="p-2 border">
                  {student.marks?.tmaMarks?.map((tma, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <span className="mr-2">{tma.label}:</span>
                      {isEditing ? (
                        <input
                          type="number"
                          value={tma.mark || ""}
                          onChange={(e) => {
                            const updatedTMAMarks = [...student.marks.tmaMarks];
                            updatedTMAMarks[index] = {
                              ...updatedTMAMarks[index],
                              mark: e.target.value,
                            };
                            handleChange(
                              student.id,
                              "tmaMarks",
                              updatedTMAMarks
                            );
                          }}
                          className="w-16 p-1 border rounded"
                        />
                      ) : (
                        tma.mark
                      )}
                    </div>
                  ))}
                </td>

                {/* Lab Marks */}
                <td className="p-2 border">
                  {student.marks?.labMarks?.map((lab, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <span className="mr-2">{lab.label}:</span>
                      {isEditing ? (
                        <input
                          type="number"
                          value={lab.mark || ""}
                          onChange={(e) => {
                            const updatedLabMarks = [...student.marks.labMarks];
                            updatedLabMarks[index] = {
                              ...updatedLabMarks[index],
                              mark: e.target.value,
                            };
                            handleChange(
                              student.id,
                              "labMarks",
                              updatedLabMarks
                            );
                          }}
                          className="w-16 p-1 border rounded"
                        />
                      ) : (
                        lab.mark
                      )}
                    </div>
                  ))}
                </td>

                {/* Final Marks */}
                <td className="p-2 border">
                  {isEditing ? (
                    <input
                      type="number"
                      value={student.marks?.finalMarks || ""}
                      onChange={(e) =>
                        handleChange(student.id, "finalMarks", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    student.marks?.finalMarks || 0
                  )}
                </td>

                {/* Eligibility Marks */}
                <td className="p-2 border">{eligibilityMarks || 0}</td>

                {/* Eligible for Final Exam */}
                <td className="p-2 border">
                  {isEligibleForFinal ? "Yes" : "No"}
                </td>

                {/* Passed Status */}
                <td className="p-2 border">
                  {isPassedStatus ? "Passed" : "Failed"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
