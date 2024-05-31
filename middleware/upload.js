const multer = require('multer');

// Configure Multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // Specify how uploaded files should be named
    const filename = file.originalname;
    cb(null, filename);
  }
});

// Initialize Multer with configured storage settings
const upload = multer({ storage: storage });

module.exports = upload;
