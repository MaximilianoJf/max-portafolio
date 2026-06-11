import express, { Response } from 'express';
import prisma from '../utils/prisma.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

const parseId = (id: string): number | null => {
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
};

const slugify = (name: string): string =>
  name.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseTechnology = (technology: string | string[]): string[] => {
  if (Array.isArray(technology)) return technology.map(t => t.trim());
  return technology.split(',').map(t => t.trim()).filter(Boolean);
};

// Get all projects (público)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { images: true },
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Get single project (público)
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseId(req.params.id);
    if (!projectId) return res.status(400).json({ error: 'Invalid project ID' });

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Error fetching project' });
  }
});

// Create project (protegido)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, url, github, technology, featured } = req.body;
    const files = req.files;

    if (!name || !description || !technology) {
      return res.status(400).json({
        error: 'name, description, and technology are required',
      });
    }

    // Upload thumbnail
    if (!files?.thumbnail) {
      return res.status(400).json({ error: 'Thumbnail image is required' });
    }

    const projectSlug = slugify(name);
    const thumbnailUrl = await uploadToCloudinary(
      files.thumbnail as UploadedFile,
      `portafolio/proyectos/${projectSlug}/thumbnail`
    );

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        description,
        url: url || null,
        github: github || null,
        image: thumbnailUrl,
        technology: parseTechnology(technology),
        featured: featured === 'true' || featured === true,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Add images to project (protegido) — supports single or multiple files
router.post('/:id/images', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseId(req.params.id);
    if (!projectId) return res.status(400).json({ error: 'Invalid project ID' });

    const { alt, category, type } = req.body;
    const files = req.files;

    if (!files?.image) {
      return res.status(400).json({ error: 'At least one image file is required' });
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const projectSlug = slugify(project.name);
    const fileType = type || 'image';

    // Normalize to array (express-fileupload sends single file as object, multiple as array)
    const imageFiles = Array.isArray(files.image) ? files.image : [files.image];

    const created = [];
    for (const file of imageFiles) {
      const imageUrl = await uploadToCloudinary(
        file as UploadedFile,
        `portafolio/proyectos/${projectSlug}/images`
      );

      let thumbnailUrl = null;
      if (fileType === 'video' && files.thumbnail) {
        const thumbFile = Array.isArray(files.thumbnail) ? files.thumbnail[0] : files.thumbnail;
        thumbnailUrl = await uploadToCloudinary(
          thumbFile as UploadedFile,
          `portafolio/proyectos/${projectSlug}/thumbnail`
        );
      }

      const projectImage = await prisma.projectImage.create({
        data: {
          projectId,
          src: imageUrl,
          alt: alt || '',
          category: category || '',
          type: fileType,
          thumbnail: thumbnailUrl,
        },
      });
      created.push(projectImage);
    }

    res.status(201).json(created.length === 1 ? created[0] : created);
  } catch (error) {
    console.error('Error adding image:', error);
    res.status(500).json({ error: 'Error adding image' });
  }
});

// Bulk delete images (protegido)
router.post('/:id/images/bulk-delete', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseId(req.params.id);
    if (!projectId) return res.status(400).json({ error: 'Invalid project ID' });

    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }

    const images = await prisma.projectImage.findMany({
      where: { id: { in: ids }, projectId },
    });

    for (const img of images) {
      if (img.src && img.src.includes('cloudinary.com')) {
        try { await deleteFromCloudinary(img.src); } catch {}
      }
      if (img.thumbnail && img.thumbnail.includes('cloudinary.com')) {
        try { await deleteFromCloudinary(img.thumbnail); } catch {}
      }
    }

    await prisma.projectImage.deleteMany({
      where: { id: { in: ids }, projectId },
    });

    res.json({ message: `${images.length} images deleted` });
  } catch (error) {
    console.error('Error bulk deleting images:', error);
    res.status(500).json({ error: 'Error deleting images' });
  }
});

// Update project (protegido)
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseId(req.params.id);
    if (!projectId) return res.status(400).json({ error: 'Invalid project ID' });

    const { name, description, url, github, technology, featured } = req.body;
    const files = req.files;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    let updateData: any = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (url !== undefined) updateData.url = url || null;
    if (github !== undefined) updateData.github = github || null;
    if (technology) updateData.technology = parseTechnology(technology);
    if (featured !== undefined) updateData.featured = featured === 'true' || featured === true;

    if (files?.thumbnail) {
      if (project.image && project.image.includes('cloudinary.com')) {
        try {
          await deleteFromCloudinary(project.image);
        } catch {
          // Ignore delete errors
        }
      }
      const projectSlug = slugify(name || project.name);
      const newThumbnailUrl = await uploadToCloudinary(
        files.thumbnail as UploadedFile,
        `portafolio/proyectos/${projectSlug}/thumbnail`
      );
      updateData.image = newThumbnailUrl;
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
      include: { images: true },
    });

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

// Update project image (protegido)
router.put('/:projectId/images/:imageId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseId(req.params.projectId);
    const imgId = parseId(req.params.imageId);
    if (!projectId || !imgId) return res.status(400).json({ error: 'Invalid ID' });

    const projectImage = await prisma.projectImage.findUnique({ where: { id: imgId } });
    if (!projectImage) return res.status(404).json({ error: 'Image not found' });

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const { alt, category, type } = req.body;
    const files = req.files;
    const projectSlug = slugify(project.name);

    const updateData: any = {};
    if (alt) updateData.alt = alt;
    if (category) updateData.category = category;
    if (type) updateData.type = type;

    if (files?.image) {
      if (projectImage.src && projectImage.src.includes('cloudinary.com')) {
        try { await deleteFromCloudinary(projectImage.src); } catch {}
      }
      updateData.src = await uploadToCloudinary(
        files.image as UploadedFile,
        `portafolio/proyectos/${projectSlug}/images`
      );
    }

    if (files?.thumbnail) {
      if (projectImage.thumbnail && projectImage.thumbnail.includes('cloudinary.com')) {
        try { await deleteFromCloudinary(projectImage.thumbnail); } catch {}
      }
      updateData.thumbnail = await uploadToCloudinary(
        files.thumbnail as UploadedFile,
        `portafolio/proyectos/${projectSlug}/thumbnail`
      );
    }

    const updated = await prisma.projectImage.update({
      where: { id: imgId },
      data: updateData,
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ error: 'Error updating image' });
  }
});

// Delete project image (protegido)
router.delete('/:projectId/images/:imageId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const imgId = parseId(req.params.imageId);
    if (!imgId) return res.status(400).json({ error: 'Invalid image ID' });

    const projectImage = await prisma.projectImage.findUnique({
      where: { id: imgId },
    });

    if (!projectImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    await deleteFromCloudinary(projectImage.src);
    if (projectImage.thumbnail) {
      await deleteFromCloudinary(projectImage.thumbnail);
    }

    await prisma.projectImage.delete({
      where: { id: imgId },
    });

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

// Delete project (protegido)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseId(req.params.id);
    if (!projectId) return res.status(400).json({ error: 'Invalid project ID' });

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await deleteFromCloudinary(project.image);

    for (const image of project.images) {
      await deleteFromCloudinary(image.src);
      if (image.thumbnail) {
        await deleteFromCloudinary(image.thumbnail);
      }
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
});

export default router;
