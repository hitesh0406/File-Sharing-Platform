import express from 'express';
import { uploadFile, downloadFile } from '../controllers/filecontroller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Protected routes
router.post('/upload', authenticate, uploadFile);
router.get('/download/:id', authenticate, downloadFile);

export default router;