import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    academicYear: {
      type: String,
      required: true
    },

    program: {
      type: String,
      required: true
    },

    semester: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("StudentProfile", studentProfileSchema);