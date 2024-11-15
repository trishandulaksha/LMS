import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  marks: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Reference to the subject
        required: true,
      },
      enrollmentDate: { type: Date, required: true },

      isValid: {
        type: Boolean,
        default: function () {
          const currentDate = new Date();
          const enrollmentYear = this.enrollmentDate.getFullYear();
          const validityYears = this.isRepeat ? 1 : 2;
          return currentDate.getFullYear() - enrollmentYear <= validityYears;
        },
      },

      miniProject: { type: Number, required: true },
      catMarks: [
        {
          label: { type: String, required: true },
          mark: { type: Number, required: true },
        },
      ],
      tmaMarks: [
        {
          label: { type: String, required: true },
          mark: { type: Number, required: true },
        },
      ],
      labMarks: [
        {
          label: { type: String, required: true },
          mark: { type: Number, required: true },
        },
      ],
      finalMarks: { type: Number, required: true },

      eligibilityMarks: {
        type: Number,
        default: async function () {
          const subject = await mongoose
            .model("Course")
            .findById(this.subject)
            .select("eligibilityCriteria");

          const criteria = subject.eligibilityCriteria;

          let catTotal = 0,
            tmaTotal = 0,
            labTotal = 0;

          if (criteria.cat === "best") {
            catTotal = Math.max(...this.catMarks.map((cat) => cat.mark));
          } else if (criteria.cat === "average") {
            catTotal =
              this.catMarks.reduce((acc, cat) => acc + cat.mark, 0) /
              this.catMarks.length;
          }

          if (criteria.tma === "average") {
            tmaTotal =
              this.tmaMarks.reduce((acc, tma) => acc + tma.mark, 0) /
              this.tmaMarks.length;
          } else if (criteria.tma === "best") {
            tmaTotal = Math.max(...this.tmaMarks.map((tma) => tma.mark));
          }

          if (this.labMarks.length > 0) {
            labTotal =
              this.labMarks.reduce((acc, lab) => acc + lab.mark, 0) /
              this.labMarks.length;
          }

          let eligibility;
          switch (criteria.type) {
            case "cat60_tma40":
              eligibility = catTotal * 0.6 + tmaTotal * 0.4;
              break;
            case "best_cat_avg_tma":
              eligibility = (catTotal + tmaTotal) / 2;
              break;
            case "miniProject60_rest40":
              const otherMarks = (catTotal + tmaTotal + labTotal) / 3;
              eligibility = this.miniProject * 0.6 + otherMarks * 0.4;
              break;
            default:
              eligibility =
                (catTotal + tmaTotal + labTotal + this.miniProject) / 4;
          }

          return eligibility;
        },
      },

      isEligibleForFinal: {
        type: Boolean,
        default: function () {
          return this.eligibilityMarks >= 40;
        },
      },

      passed: {
        type: Boolean,
        default: function () {
          return this.finalMarks >= 40;
        },
      },
    },
  ],
});

const Marks = mongoose.model("Marks", marksSchema);
export default Marks;
