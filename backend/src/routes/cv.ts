import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

let currentCVUrl: string | null = null;

// Get current CV URL
router.get('/current', async (req: AuthRequest, res: Response) => {
  try {
    res.json({ url: currentCVUrl });
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ error: 'Error fetching CV' });
  }
});

// Upload/Update CV (protegido)
router.post('/upload', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const files = req.files;

    if (!files?.cv) {
      return res.status(400).json({ error: 'CV file is required' });
    }

    // Delete old CV if exists
    if (currentCVUrl) {
      try {
        await deleteFromCloudinary(currentCVUrl);
      } catch (error) {
        console.error('Error deleting old CV:', error);
        // Continue anyway
      }
    }

    // Upload new CV
    const cvUrl = await uploadToCloudinary(
      files.cv as UploadedFile,
      'portafolio/cv'
    );

    currentCVUrl = cvUrl;

    res.json({
      message: 'CV updated successfully',
      url: cvUrl,
    });
  } catch (error) {
    console.error('Error uploading CV:', error);
    res.status(500).json({ error: 'Error uploading CV' });
  }
});

export default router;
