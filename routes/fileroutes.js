import express from 'express';
import { uploadFile, downloadFile } from '../controllers/fileController.js';
import authenticate from '../middleware/authenticate.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.get('/download/:id', authenticate, downloadFile);

export default router;