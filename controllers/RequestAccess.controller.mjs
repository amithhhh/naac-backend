import RequestAccess from "../models/RequestAccess.mjs";


export const requestAccess = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ "Message": "Session out please login" });
        }

        await RequestAccess.create({
            userId,
            Status: "pending",
            "message": req.body.message
        })
        res.status(200).json({"message":"the message has sent to the hod"})
    } catch (error) {
        return res.status(400).json({"message":"Something fishy."})
    }
}