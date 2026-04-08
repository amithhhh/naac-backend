import StudentProfile from "../models/StudentProfile.mjs";

export const CreateOrUpdate = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students are allowed"
      });
    }

    const userId = req.user._id;

    const updateData = {};

    if (req.body.admissionApplicationNumber)
      updateData.admissionApplicationNumber = req.body.admissionApplicationNumber;

    if (req.body.universityEnrollmentNumber)
      updateData.universityEnrollmentNumber = req.body.universityEnrollmentNumber;

    if (req.body.rollNumber)
      updateData.rollNumber = req.body.rollNumber;

    if (req.body.faculty)
      updateData.faculty = req.body.faculty;

    if (req.body.programLevel)
      updateData.programLevel = req.body.programLevel;

    if (req.body.degreeName)
      updateData.degreeName = req.body.degreeName;

    if (req.body.specialization)
      updateData.specialization = req.body.specialization;

    if (req.body.thesisTopic)
      updateData.thesisTopic = req.body.thesisTopic;

    if (req.body.researchSupervisor)
      updateData.researchSupervisor = req.body.researchSupervisor;

    if (req.body.admissionBatch)
      updateData.admissionBatch = req.body.admissionBatch;

    if (req.body.academicCycle)
      updateData.academicCycle = req.body.academicCycle;

    if (req.body.currentYear)
      updateData.currentYear = req.body.currentYear;

    if (req.body.currentSemester)
      updateData.currentSemester = req.body.currentSemester;

    if (req.body.modeOfStudy)
      updateData.modeOfStudy = req.body.modeOfStudy;

    if (req.body.admissionCategory)
      updateData.admissionCategory = req.body.admissionCategory;

    if (req.body.fellowshipLetterNumber)
      updateData.fellowshipLetterNumber = req.body.fellowshipLetterNumber;

    const profile = await StudentProfile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json({
      message: "Student profile saved",
      profile
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate value detected (must be unique)",
        field: Object.keys(error.keyValue)
      });
    }

    res.status(500).json({ message: error.message });
  }
};

export const GetAcademicDetails = async (req, res) => {
    try {
        const id = req.user._id;

        const user = await StudentProfile.findOne({userId: id})

        if (!user) {
            return res.status(404).json({"message":"User Does not exist"});
        }

        res.status(200).json({
            "message": "Successful",
            "academic_details": user
        })
    } catch (error) {
        return res.status(500).json({"message": "server error"})
    }
}