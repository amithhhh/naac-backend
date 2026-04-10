import StudentProfile from "../models/StudentProfile.mjs";
import Users from "../models/Users.mjs";

export const CreateOrUpdate = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students allowed" });
    }

    let users = await Users.findById(req.user._id);

    console.log(users.canEdit);

    if (!users.canEdit || !users) {
      return res.status(403).json({ message: "Editing not allowed" });
    }

    const userId = req.user._id;

    const existingProfile = await StudentProfile.findOne({ userId });

    // First-time validation
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

    // Conditional validation
    const health = req.body.health_details;

    if (
      health?.disabilityStatus === true &&
      (!health?.disabilityDetails || health.disabilityDetails.trim() === "")
    ) {
      return res.status(400).json({
        message: "Disability details required"
      });
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { userId },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    // Disable edit after update
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

export const GetAcademicDetails = async (req, res) => {
  try {
    const user = await StudentProfile.findOne({userId: req.user._id});

    if (!user) {
      return res.status(403).json({ message: "User does not exist"});
    }
    res.status(200).json({ message: "Only students allowed", user});
  } catch (error) {
    return res.status(403).json({ message: "Something fishy...!" });
  }
}