import mongoose from "mongoose";


const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    academic_details: {
      admissionApplicationNumber: String,
      universityEnrollmentNumber: String,
      rollNumber: String,

      faculty: String,

      programLevel: {
        type: String,
        enum: ["Diploma", "UG", "PG", "M.Phil", "PhD", "PostDoc", "FYIMP"]
      },

      degreeName: String,
      specialization: String,

      thesisTopic: String,
      researchSupervisor: String,

      admissionBatch: String,
      academicCycle: String,

      currentYear: String,

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

      fellowshipLetterNumber: String,
      fellowshipLetter: {
		url: String,
		public_id: String
      }
    },

    personal_details: {
      fullName: {
        type: String,
        trim: true
      },

      fullNameNative: String,

      dob: Date,

      gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
      },

      nationality: String,

      dualCitizenship: {
        type: Boolean,
        default: false
      },

      domicileState: String,
      religion: String,

      socialCategory: {
        type: String,
        enum: ["General", "SC", "ST", "OBC", "EWS", "Minority", "SEBC"]
      },

      caste: String,
      motherTongue: String,

      languagesKnown: [String],
      socialCategory: String,
      aadhaarNumber: {
        type: String,
        match: [/^\d{12}$/, "Aadhaar must be 12 digits"]
      },

      passportNumber: String,
      passportDoc: String,
      passportExpiry: String,
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
      },
       visaDoc: String,
	birthCertificateDoc: String,
    },
    contact_details: {
      personalMobile: {
        countryCode: String,
        number: String
      },

      whatsappNumber: {
        countryCode: String,
        number: String
      },

      personalEmail: String,
      institutionalEmail: String,

      emergencyContact: {
        name: String,
        relation: String,
        number: {
          countryCode: String,
          number: String
        }
      },

      permanentAddress: {
        addressLine: String,
        city: String,
        district: String,
        state: String,
        pinCode: String
      },

      correspondenceAddress: {
        addressLine: String,
        city: String,
        district: String,
        state: String,
        pinCode: String
      },

      distanceToCampus: Number
    },
    health_details: {
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
      },

      physicalDimensions: {
        type: String
      },

      disabilityStatus: {
        type: Boolean,
        default: false
      },

      disabilityDetails: {
        type: String
      },

      disabilityCertificate: {
        type: String
      },

      chronicConditions: {
        type: String
      },

      regularMedications: {
        type: String
      },

      insurance: {
        provider: String,
        policyNumber: String
      },

      vaccinationStatus: {
        type: String
      }
    },
    family_details: {
      father: {
        name: String,
        qualification: String,
        occupation: String
      },

      mother: {
        name: String,
        qualification: String,
        occupation: String
      },

      annualFamilyIncome: Number,

      siblings: [
        {
          name: String,
          educationStatus: String
        }
      ],

      parentContact: {
        countryCode: String,
        number: String
      },

      guardian: {
        name: String,
        relation: String,
        contact: {
          countryCode: String,
          number: String
        },
        address: {
          addressLine: String,
          city: String,
          district: String,
          state: String,
          pinCode: String
        }
      }
    },
    education_details: {
      tenth: {
        board: String,
        school: String,
        year: String,
        percentage: Number,
        marksheet: String   // file path / URL
      },

      twelfth: {
        board: String,
        stream: String,
        school: String,
        year: String,
        marksheet: String
      },

      ug: {
        university: String,
        degree: String,
        cgpa: Number,
        certificate: String
      },

      pg: {
        university: String,
        cgpa: Number,
        certificate: String
      },

      certifications: [
        {
          name: String,
          file: String
        }
      ],

      competitiveExams: [
        {
          examName: {
            type: String,
            enum: ["NET", "GATE", "CAT", "NEET", "JEE", "Other"]
          },
          score: String,
          scoreCard: String
        }
      ],

      migrationCertificate: String
    },
    financial_details: {
      scholarship: {
        category: {
          type: String,
          enum: ["None", "Merit", "SC/ST", "OBC", "EWS", "Minority", "Other"]
        },

        scholarshipId: String   // NSP / State ID
      },

      feeWaiver: {
        document: String   // UL (file path / URL)
      },

      educationLoan: {
        bankName: String,
        branch: String,
        amount: Number
      },

      bankDetails: {
        accountHolderName: String,
        accountNumber: String,
        ifscCode: String
      },

      panNumber: {
        type: String,
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"]
      }
    },
    professional_details: {
      researchPublications: [
        {
          title: String,
          journal: String,
          year: String,
          frontPage: String   // UL
        }
      ],

      conferencePresentations: [
        {
          title: String,
          conferenceName: String,
          year: String,
          certificate: String   // UL
        }
      ],

      patents: [
        {
          title: String,
          status: String,   // Filed / Published / Granted
          document: String  // UL
        }
      ],

      workExperience: [
        {
          organization: String,
          role: String,
          duration: String,
          experienceLetter: String   // UL
        }
      ],

      professionalMemberships: [
        {
          organization: String,
          membershipId: String,
          document: String   // UL
        }
      ],

      skills: {
        technical: [String],
        software: [String]
      }
    },
    residential_details: {
      residentialType: {
        type: String,
        enum: ["Day Scholar", "Hosteller"],
      },

      hostelDetails: {
        hostelName: String,
        roomNumber: String,
        bedNumber: String
      },

      messPreference: {
        type: String,
        enum: ["Veg", "Non-Veg", "Special", "None"]
      },

      transport: {
        opted: {
          type: Boolean,
          default: false
        },

        busRoute: String,
        pickupPoint: String
      },

      vehicleDetails: {
        registrationNumber: String
      }
    },
    documents: {
      profilePhoto: String,
      digitalSignature: String,

      academicTranscripts: [
        {
          name: String,
          file: String
        }
      ],

      identityProof: {
        type: {
          type: String,
          enum: ["Aadhaar", "Passport", "Driving License", "Voter ID"]
        },
        document: String
      },

      legalCertificates: {
        incomeCertificate: String,
        casteCertificate: String,
        nonCreamyLayerCertificate: String,
        nativityCertificate: String
      }
    }

  },
  { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);
