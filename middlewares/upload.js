const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
require('dotenv').config();

// Function to check the file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/; // Allowed file types
  const mimetype = filetypes.test(file.mimetype); // Check MIME type
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check extension

  if (mimetype && extname) {
    return cb(null, true); // Accept file
  } else {
    cb('Error: Images Only!'); // Reject file
  }
}

// Function to create storage engine
function createStorage(destination) {
  return multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, destination);
    },
    filename: function(req, file, cb) {
      const ext = path.extname(file.originalname) || '.' + file.mimetype.split('/')[1];
      const filename = file.fieldname + '-' + Date.now() + ext;
      cb(null, filename);
    }
  });
}

// Initialize upload with dynamic storage
function createUpload(destination, fieldName) {
  const storage = createStorage(destination);
  return multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb); // Check the file type before processing
    }
  }).single(fieldName);
}

// Function to create thumbnails with dynamic paths
async function createThumbnail(destination, thumbnailPath, req, res, next) {
  if (req.file) {
    const ext = path.extname(req.file.originalname) || '.' + req.file.mimetype.split('/')[1];
    const thumbnailName = req.file.fieldname + '-' + Date.now() + '-thumbnail' + ext;
    const thumbnailFullPath = path.join(__dirname, '../', thumbnailPath, thumbnailName);

    try {
      // Create and save the thumbnail
      await sharp(req.file.path)
        .resize(200, 200)
        .toFile(thumbnailFullPath);
      
      req.file.thumbnail = thumbnailName; // Save thumbnail name for further use
    } catch (err) {
      console.error(err); // Log any errors during thumbnail creation
    }
  }
  next(); // Proceed to the next middleware or route handler
}

module.exports = { createUpload, createThumbnail };
