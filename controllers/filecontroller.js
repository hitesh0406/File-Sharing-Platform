import { File } from '../models/File.js';

export const uploadFile = async (req, res) => {
  try {
    const { filename, path } = req.file;
    const userId = req.userId;

    const file = new File({ filename, path, user: userId });
    await file.save();

    res.json({ message: 'File uploaded successfully', file });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.id, user: req.userId });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(file.path, file.filename);
  } catch (error) {
    console.error('File download error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};