import mongoose from "mongoose";

const personalDetailsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        fullName: {
            type: String,
            required: true,
            trim:true
        },
        fullNameNative: {
            type: String,
            required: true
        },

        dob: {
            type: Date,
            required: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Others"],
            required: true
        },

        nationality: {
            type: String,
            required: true
        },

        dualCitizenship: {
            type: Boolean,
            default: false
        },

        domicileState: String,
        religion: {
            type: String,
            required: true
        },

        socialCategory: {
            type: String,
            enum: ["General", "SC", "ST", "OBC", "EWS", "Minority", "SEBC"],
            required: true
        },

        caste: {
            type: String,
            required: true
        },

        motherTongue: {
            type: String,
            required: true
        },

        languagesKnown: [String],

        aadhaarNumber: {
            type: String,
            required: function () {
                return this.nationality === "Indian";
            },
            match: [/^\d{12}$/, "Aadhaar must be 12 digits"]
        },

    passportNumber: {
            type: String
        },

        visaDetails: {
            visaType: String,
            visaNumber: String,
            issuingCountry: String,
            issueDate: Date,
            expiryDate: Date,
            status: {
                type: String,
                enum: ["Active", "Expired", "Pending"]
            }
        }
    },
    { timestamps: true }
);

export default mongoose.model("PersonalDetails", personalDetailsSchema);