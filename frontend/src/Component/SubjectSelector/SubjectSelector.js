import React from "react";

const SubjectSelector = ({ subjects, setSelectedSubject }) => {
  return (
    <div className="mb-4">
      <label htmlFor="subject" className="block mb-2 font-medium">
        Select Subject:
      </label>
      <select
        id="subject"
        className="w-full p-2 border rounded"
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="">-- Select a Subject --</option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectSelector;
