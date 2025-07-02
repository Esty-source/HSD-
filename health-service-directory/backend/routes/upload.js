const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Create subdirectories based on file type
    let subDir = 'general';
    if (file.fieldname === 'profile_image') {
      subDir = 'profiles';
    } else if (file.fieldname === 'medical_document') {
      subDir = 'medical';
    } else if (file.fieldname === 'prescription') {
      subDir = 'prescriptions';
    }
    
    const finalDir = path.join(uploadDir, subDir);
    if (!fs.existsSync(finalDir)) {
      fs.mkdirSync(finalDir, { recursive: true });
    }
    
    cb(null, finalDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow images and documents
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'application/pdf', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload profile image
router.post('/profile-image', authenticateToken, upload.single('profile_image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const connection = await pool.getConnection();

    try {
      // Save file record to database
      const file_id = uuidv4();
      await connection.execute(`
        INSERT INTO file_uploads (
          id, user_id, file_name, original_name, file_path, 
          file_size, mime_type, file_type
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        file_id, req.user.id, req.file.filename, req.file.originalname,
        req.file.path, req.file.size, req.file.mimetype, 'profile_image'
      ]);

      // Update user profile with image path
      await connection.execute(`
        UPDATE profiles 
        SET profile_image = ? 
        WHERE user_id = ?
      `, [req.file.path, req.user.id]);

      res.json({
        message: 'Profile image uploaded successfully',
        file_id,
        file_path: req.file.path,
        file_name: req.file.filename
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Upload profile image error:', error);
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
});

// Upload medical document
router.post('/medical-document', authenticateToken, upload.single('medical_document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { related_id, description } = req.body;

    const connection = await pool.getConnection();

    try {
      // Save file record to database
      const file_id = uuidv4();
      await connection.execute(`
        INSERT INTO file_uploads (
          id, user_id, file_name, original_name, file_path, 
          file_size, mime_type, file_type, related_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        file_id, req.user.id, req.file.filename, req.file.originalname,
        req.file.path, req.file.size, req.file.mimetype, 'medical_document', related_id
      ]);

      res.json({
        message: 'Medical document uploaded successfully',
        file_id,
        file_path: req.file.path,
        file_name: req.file.filename
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Upload medical document error:', error);
    res.status(500).json({ error: 'Failed to upload medical document' });
  }
});

// Upload prescription document
router.post('/prescription', authenticateToken, upload.single('prescription'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { related_id } = req.body;

    const connection = await pool.getConnection();

    try {
      // Save file record to database
      const file_id = uuidv4();
      await connection.execute(`
        INSERT INTO file_uploads (
          id, user_id, file_name, original_name, file_path, 
          file_size, mime_type, file_type, related_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        file_id, req.user.id, req.file.filename, req.file.originalname,
        req.file.path, req.file.size, req.file.mimetype, 'prescription', related_id
      ]);

      res.json({
        message: 'Prescription uploaded successfully',
        file_id,
        file_path: req.file.path,
        file_name: req.file.filename
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Upload prescription error:', error);
    res.status(500).json({ error: 'Failed to upload prescription' });
  }
});

// Get user's uploaded files
router.get('/my-files', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [files] = await connection.execute(`
        SELECT * FROM file_uploads 
        WHERE user_id = ?
        ORDER BY uploaded_at DESC
      `, [req.user.id]);

      res.json({ files });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get my files error:', error);
    res.status(500).json({ error: 'Failed to get files' });
  }
});

// Get files by type
router.get('/files/:type', authenticateToken, async (req, res) => {
  try {
    const { type } = req.params;

    const connection = await pool.getConnection();

    try {
      const [files] = await connection.execute(`
        SELECT * FROM file_uploads 
        WHERE user_id = ? AND file_type = ?
        ORDER BY uploaded_at DESC
      `, [req.user.id, type]);

      res.json({ files });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get files by type error:', error);
    res.status(500).json({ error: 'Failed to get files' });
  }
});

// Delete uploaded file
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      // Get file info
      const [files] = await connection.execute(
        'SELECT * FROM file_uploads WHERE id = ? AND user_id = ?',
        [id, req.user.id]
      );

      if (files.length === 0) {
        return res.status(404).json({ error: 'File not found or access denied' });
      }

      const file = files[0];

      // Delete file from filesystem
      if (fs.existsSync(file.file_path)) {
        fs.unlinkSync(file.file_path);
      }

      // Delete record from database
      await connection.execute('DELETE FROM file_uploads WHERE id = ?', [id]);

      res.json({ message: 'File deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Download file
router.get('/download/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      // Get file info
      const [files] = await connection.execute(
        'SELECT * FROM file_uploads WHERE id = ? AND user_id = ?',
        [id, req.user.id]
      );

      if (files.length === 0) {
        return res.status(404).json({ error: 'File not found or access denied' });
      }

      const file = files[0];

      // Check if file exists
      if (!fs.existsSync(file.file_path)) {
        return res.status(404).json({ error: 'File not found on server' });
      }

      // Set headers for download
      res.setHeader('Content-Type', file.mime_type);
      res.setHeader('Content-Disposition', `attachment; filename="${file.original_name}"`);

      // Stream file to response
      const fileStream = fs.createReadStream(file.file_path);
      fileStream.pipe(res);

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

module.exports = router; 