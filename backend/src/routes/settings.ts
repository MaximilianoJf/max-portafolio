import express, { Response } from 'express';
import prisma from '../utils/prisma.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

const PROFILE_PHOTO_KEY = 'profilePhoto';

// Get profile photo URL (público)
router.get('/profile-photo', async (req: AuthRequest, res: Response) => {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: PROFILE_PHOTO_KEY },
    });
    res.json({ url: setting?.value || null });
  } catch (error) {
    console.error('Error fetching profile photo:', error);
    res.status(500).json({ error: 'Error fetching profile photo' });
  }
});

// Upload/Update profile photo (protegido)
router.post('/profile-photo', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const files = req.files;

    if (!files?.photo) {
      return res.status(400).json({ error: 'Photo file is required' });
    }

    // Delete old photo from Cloudinary if exists
    const existing = await prisma.siteSetting.findUnique({
      where: { key: PROFILE_PHOTO_KEY },
    });
    if (existing?.value && existing.value.includes('cloudinary.com')) {
      try { await deleteFromCloudinary(existing.value); } catch {}
    }

    const photoFile = Array.isArray(files.photo) ? files.photo[0] : files.photo;
    const photoUrl = await uploadToCloudinary(
      photoFile as UploadedFile,
      'portafolio/profile'
    );

    const setting = await prisma.siteSetting.upsert({
      where: { key: PROFILE_PHOTO_KEY },
      update: { value: photoUrl },
      create: { key: PROFILE_PHOTO_KEY, value: photoUrl },
    });

    res.json({ message: 'Profile photo updated successfully', url: setting.value });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({ error: 'Error uploading profile photo' });
  }
});

export default router;
