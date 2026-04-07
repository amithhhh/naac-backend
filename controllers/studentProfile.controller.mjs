import StudentProfile from "../models/StudentProfile.mjs";


export const CreateOrUpdate = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(400).json({ "message": "only students are allowed to edit" });
        }

        const userId = req.user._id;

        const { department, academicYear, program, semester } = req.body;

        const profile = await StudentProfile.findOneAndUpdate(
            { userId },
            {userId,  department, academicYear, program, semester },
            { new: true, upsert: true }
        )

        res.json({
            message: "Student profile saved",
            profile
        });


    } catch(error) {
        res.status(400).json({"message": error.message})
    }
}


