import PersonalDetails from "../models/PersonalDetails.mjs";
import Users from "../models/Users.mjs";

export const createOrUpdatePersonal = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await Users.findById(userId);

    if (!user.canEdit) {
      return res.status(403).json({
        message: "Editing not allowed"
      });
    }

    const updateData = { ...req.body };

    delete updateData.userId;

    updateData.userId = userId;

    const profile = await PersonalDetails.findOneAndUpdate(
      { userId },
      { $set: updateData },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    await Users.findByIdAndUpdate(userId, {
      canEdit: false
    });

    res.status(200).json({
      message: "Personal details updated",
      profile
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};