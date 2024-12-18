function GradeTableComponent({ subjects, year }) {
  return (
    <div className="table-section">
      <h2 className="mb-2 text-xl font-semibold">{year}</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border">No.</th>
            <th className="px-4 py-2 border">Subject Code</th>
            <th className="px-4 py-2 border">Subject Name</th>
            <th className="px-4 py-2 border">Result</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject.courseCode}>
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{subject.courseCode}</td>
              <td className="px-4 py-2 border">{subject.courseName}</td>
              <td className="px-4 py-2 border">{subject.finalMarks}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradeTableComponent;
