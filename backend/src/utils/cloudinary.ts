import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs/promises';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: UploadedFile,
  folder: string = 'portafolio/projects'
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
      resource_type: 'auto',
    });

    // Delete temp file
    await fs.unlink(file.tempFilePath);

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Error uploading file to Cloudinary');
  }
};

export const deleteFromCloudinary = async (secureUrl: string): Promise<void> => {
  try {
    const urlParts = secureUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) {
      throw new Error('Invalid Cloudinary URL');
    }
    // public_id is everything after "upload/v{version}/" without the extension
    const pathAfterUpload = urlParts.slice(uploadIndex + 1);
    // Skip the version segment (e.g., "v1234567890")
    const startIndex = pathAfterUpload[0]?.match(/^v\d+$/) ? 1 : 0;
    const publicId = pathAfterUpload
      .slice(startIndex)
      .join('/')
      .replace(/\.[^/.]+$/, '');

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Error deleting file from Cloudinary');
  }
};
