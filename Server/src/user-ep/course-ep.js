import {
  bulkCreateSubjects,
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
} from "../dao/course-dao.js";

// Bulk insert subjects
export async function bulkCreateSubjectsEp(req, res) {
  try {
    const subjects = req.body; // Receive all subjects as an array from the request body
    const result = await bulkCreateSubjects(subjects);
    res.send({ success: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Fetch all subjects
export async function getAllSubjectsEp(req, res) {
  try {
    const subjects = await getAllSubjects();
    res.send({ success: subjects });
  } catch (error) {
    res.send({ error: error.message });
  }
}

// Fetch a subject by ID
export async function getSubjectByIdEp(req, res) {
  try {
    const subject = await getSubjectById(req.params.id);
    if (subject) {
      res.send({ success: subject });
    } else {
      res.status(404).send({ error: "Subject not found" });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}

// Create a new subject
export async function createSubjectEp(req, res) {
  try {
    const newSubject = await createSubject(req.body);
    res.send({ success: newSubject });
  } catch (error) {
    res.send({ error: error.message });
  }
}

// Update a subject
export async function updateSubjectEp(req, res) {
  try {
    const { courseCode, updateData } = req.body;
    console.log(req.body);
    if (!courseCode || !updateData) {
      return res
        .status(400)
        .send({ error: "courseCode and updateData are required" });
    }
    const updatedSubject = await updateSubject(courseCode, updateData);
    if (updatedSubject) {
      res.send({ success: updatedSubject });
    } else {
      res.status(404).send({ error: "Subject not found" });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}

// Delete a subject
export async function deleteSubjectEp(req, res) {
  try {
    const deletedSubject = await deleteSubject(req.body.courseCode);
    if (deletedSubject) {
      res.send({ success: deletedSubject });
    } else {
      res.status(404).send({ error: "Subject not found" });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}
