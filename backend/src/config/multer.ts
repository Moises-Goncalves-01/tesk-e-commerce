import multer from 'multer';

// Upload configuration using Memory Storage
// This allows us to intercept the file buffer and send it directly to Supabase via API
// without having to temporarily save it to the local disk.
export const uploadConfig = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed.'));
    }
  },
});
