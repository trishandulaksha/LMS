import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  student: {
    type: String,
    ref: "User",
    required: true,
  },
  marks: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      enrollmentDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
      isValid: {
        type: Boolean,
        default: function () {
          // Make sure enrollmentDate exists before using it
          if (!this.enrollmentDate) {
            return false;
          }
          const currentDate = new Date();
          const enrollmentYear = this.enrollmentDate.getFullYear();
          const validityYears = this.isRepeat ? 1 : 2;
          return currentDate.getFullYear() - enrollmentYear <= validityYears;
        },
      },
      miniProject: { type: Number, default: 0 },
      catMarks: {
        type: [
          {
            label: { type: String, required: true },
            mark: { type: Number, default: 0 },
          },
        ],
        default: Array.from({ length: 4 }, (_, i) => ({
          label: `CAT ${i + 1}`,
          mark: 0,
        })),
      },
      tmaMarks: {
        type: [
          {
            label: { type: String, required: true },
            mark: { type: Number, default: 0 },
          },
        ],
        default: Array.from({ length: 4 }, (_, i) => ({
          label: `TMA ${i + 1}`,
          mark: 0,
        })),
      },
      labMarks: {
        type: [
          {
            label: { type: String, required: true },
            mark: { type: Number, default: 0 },
          },
        ],
        default: Array.from({ length: 4 }, (_, i) => ({
          label: `Lab ${i + 1}`,
          mark: 0,
        })),
      },
      finalMarks: { type: Number, default: 0 },

      eligibilityMarks: {
        type: Number,
        default: 0,
      },

      isEligibleForFinal: {
        type: Boolean,
        default: false,
      },

      passed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Eligible", "Resit", "Repeated"],
    default: "Pending",
  },
});

// Adding method to calculate eligibility marks
marksSchema.methods.calculateEligibilityMarks = async function () {
  const markRecord = this.marks[0]; // Assuming one record for each subject

  // Get the subject to apply the eligibility criteria
  const subject = await mongoose.model("Course").findById(markRecord.subject);
  const criteria = subject.eligibilityCriteria;

  let catTotal = 0,
    tmaTotal = 0,
    labTotal = 0;

  // CAT Calculation
  if (criteria.cat === "best") {
    catTotal = Math.max(...markRecord.catMarks.map((cat) => cat.mark));
  } else if (criteria.cat === "average") {
    catTotal =
      markRecord.catMarks.reduce((acc, cat) => acc + cat.mark, 0) /
      markRecord.catMarks.length;
  }

  // TMA Calculation
  if (criteria.tma === "average") {
    tmaTotal =
      markRecord.tmaMarks.reduce((acc, tma) => acc + tma.mark, 0) /
      markRecord.tmaMarks.length;
  } else if (criteria.tma === "best") {
    tmaTotal = Math.max(...markRecord.tmaMarks.map((tma) => tma.mark));
  }

  // Lab Calculation
  if (markRecord.labMarks.length > 0) {
    labTotal =
      markRecord.labMarks.reduce((acc, lab) => acc + lab.mark, 0) /
      markRecord.labMarks.length;
  }

  let eligibility;

  // Eligibility calculation based on criteria
  switch (criteria.type) {
    case "cat60_tma40":
      eligibility = catTotal * 0.6 + tmaTotal * 0.4;
      break;
    case "best_cat_avg_tma":
      eligibility = (catTotal + tmaTotal) / 2;
      break;
    case "miniProject60_rest40":
      const otherMarks = (catTotal + tmaTotal + labTotal) / 3;
      eligibility = markRecord.miniProject * 0.6 + otherMarks * 0.4;
      break;
    default:
      eligibility =
        (catTotal + tmaTotal + labTotal + markRecord.miniProject) / 4;
  }

  return eligibility;
};

// Pre-save hook to calculate eligibilityMarks before saving
marksSchema.pre("save", async function (next) {
  const eligibilityMarks = await this.calculateEligibilityMarks();
  this.eligibilityMarks = eligibilityMarks;
  next();
});

// Create model based on the schema
const Marks = mongoose.model("Marks", marksSchema);
export default Marks;
