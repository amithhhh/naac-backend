import StudentProfile from "../models/StudentProfile.mjs";
import Users from "../models/Users.mjs";

export const CreateOrUpdate = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students allowed" });
    }

    const userId = req.user._id;
    const files = req.files || {}; 
    const users = await Users.findById(userId);

    if (!users || !users.canEdit) {
      return res.status(403).json({ message: "Editing not allowed" });
    }

    const existingProfile = await StudentProfile.findOne({ userId });

    const academic = req.body.academic_details;

    if (!existingProfile) {
      if (
        !academic?.rollNumber ||
        !academic?.admissionApplicationNumber ||
        !academic?.universityEnrollmentNumber
      ) {
        return res.status(400).json({
          message: "Academic identifiers required for first submission"
        });
      }
    }

    const admissionNumber = academic?.admissionApplicationNumber;
    const enrollmentNumber = academic?.universityEnrollmentNumber;
    const rollNumber = academic?.rollNumber;

    let errors = {};

    if (admissionNumber) {
      const existing = await StudentProfile.findOne({
        "academic_details.admissionApplicationNumber": admissionNumber
      });

      if (existing && existing.userId.toString() !== userId.toString()) {
        errors.admissionApplicationNumber = "Already exists";
      }
    }

    if (enrollmentNumber) {
      const existing = await StudentProfile.findOne({
        "academic_details.universityEnrollmentNumber": enrollmentNumber
      });

      if (existing && existing.userId.toString() !== userId.toString()) {
        errors.universityEnrollmentNumber = "Already exists";
      }
    }

    if (rollNumber) {
      const existing = await StudentProfile.findOne({
        "academic_details.rollNumber": rollNumber
      });

      if (existing && existing.userId.toString() !== userId.toString()) {
        errors.rollNumber = "Already exists";
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Duplicate fields",
        errors
      });
    }

    let updateData = {};

    // ✅ academic fields
    if (req.body.academic_details) {
      for (let key in req.body.academic_details) {
        updateData[`academic_details.${key}`] =
          req.body.academic_details[key];
      }
    }

    // ✅ personal fields (ADD THIS)
    if (req.body.personal_details) {
      for (let key in req.body.personal_details) {
        updateData[`personal_details.${key}`] =
          req.body.personal_details[key];
      }
    }

    // =========================
    // ✅ FILE HANDLING (UPDATED)
    // =========================

    // fellowshipLetter (academic)
    if (files.fellowshipLetter) {
      updateData["academic_details.fellowshipLetter"] =
        files.fellowshipLetter[0].path;
    }

    // passportDoc (personal)
    if (files.passportDoc) {
      updateData["personal_details.passportDoc"] =
        files.passportDoc[0].path;
    }

    // visaDoc (personal)
    if (files.visaDoc) {
      updateData["personal_details.visaDoc"] =
        files.visaDoc[0].path;
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    await Users.findByIdAndUpdate(userId, { canEdit: false });

    res.status(200).json({
      message: "Profile saved successfully",
      profile
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate value detected",
        field: Object.keys(error.keyValue)
      });
    }

    res.status(500).json({ message: error.message });
  }
};
