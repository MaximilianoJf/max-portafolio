import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { db } from './seed-data.js';

const prisma = new PrismaClient();

// Los primeros 4 proyectos (ids 1-4 en las constantes) son Trabajos Destacados
const FEATURED_IDS = [1, 2, 3, 4];

async function main() {
  // 1. Usuario admin desde .env
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: { email: adminEmail, password: hashed },
    });
    console.log(`✅ Admin: ${adminEmail}`);
  } else {
    console.warn('⚠️  ADMIN_EMAIL / ADMIN_PASSWORD no configurados en .env — se omite creación de admin');
  }

  // 2. Proyectos desde las constantes
  for (const [index, p] of db.entries()) {
    const exists = await prisma.project.findFirst({ where: { name: p.name } });
    if (exists) {
      console.log(`⏭️  Ya existe: ${p.name}`);
      continue;
    }

    await prisma.project.create({
      data: {
        name: p.name,
        description: p.description,
        url: p.url || null,
        github: p.github || null,
        image: p.image,
        technology: p.technology,
        featured: FEATURED_IDS.includes(p.id),
        sortOrder: index,
        images: {
          create: p.images.map((img: any) => ({
            src: img.src,
            alt: img.alt,
            category: img.category,
            type: img.type,
            thumbnail: img.thumbnail || null,
          })),
        },
      },
    });
    console.log(`✅ Creado: ${p.name}`);
  }

  console.log('\n🌱 Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
