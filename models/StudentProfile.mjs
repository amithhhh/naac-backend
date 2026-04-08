import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    admissionApplicationNumber: {
      type: String,
      required: true,
      unique: true
    },
    universityEnrollmentNumber: {
      type: String,
      required: true,
      unique: true
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },

    faculty: String,

    programLevel: {
      type: String,
      enum: ["Diploma", "UG", "PG", "M.Phil", "PhD", "PostDoc", "FYIMP"]
    },

    degreeName: {
      type: String,
      required: true,
    },
    specialization: {
      type: String
    },

    thesisTopic: String,
    researchSupervisor: String,

    admissionBatch: String,
    academicCycle: String,

    currentYear: {
      type: Date
    },
    currentSemester: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },

    modeOfStudy: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Distance", "Executive"]
    },

    admissionCategory: {
      type: String,
      enum: ["Merit", "Entrance", "Management", "Sponsored", "International"]
    },

    fellowshipLetterNumber: String
  },
  { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);