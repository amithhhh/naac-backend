import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.mjs";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    
    // Clean filename: remove spaces/special chars to prevent URL issues
    const cleanFileName = file.originalname
      .split('.')[0]
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();

    return {
      folder: "uploads",
      // Keep PDF as 'raw' and images as 'image'
      resource_type: isPdf ? "raw" : "image",
      public_id: `${Date.now()}-${cleanFileName}`,
      // Force format for raw files helps Cloudinary manage extensions
      format: isPdf ? "pdf" : "png", 
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Passing a descriptive error that your Express error handler can catch
    cb(new Error("Invalid file type. Only JPG, PNG, and PDF are accepted."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

export default upload;
