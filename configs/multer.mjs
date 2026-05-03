import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.user._id;

    if (!username) {
      return cb(new Error("Please Login"), null);
    }

    const userFolder = path.join("uploads", username);

    fs.mkdirSync(userFolder, {recursive: true});
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    const username = req.user._id;

    const ext = path.extname(file.originalname);

    // clean original name
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();

    let fileName;

    if (file.mimetype === "application/pdf") {
      fileName = `${username}_${cleanName}.pdf`;
    } else {
      fileName = `${username}_${cleanName}${ext}`;
    }

    cb(null, fileName);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, PDF allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export default upload;