import mongoose from "mongoose";

const RequestAccess = mongoose.Schema({
    userdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String
    },
    Status: {
        type: String,
        enum: ["cancelled", "approved", "pending"],
        default: "pending"
    }
})

export default mongoose.model("RequestAccess", RequestAccess);