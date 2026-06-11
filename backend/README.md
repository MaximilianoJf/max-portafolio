# Backend - Panel Administrativo Portafolio

Sistema backend con Express.js para gestionar proyectos del portafolio con autenticación, almacenamiento en Cloudinary y base de datos PostgreSQL con Prisma.

## 🚀 Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno

Copiar `.env.example` a `.env` y llenar con tus valores:

```bash
cp .env.example .env
```

**Variables necesarias:**

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/portafolio_db"

# JWT
JWT_SECRET="tu_clave_secreta_super_segura"
JWT_EXPIRE="7d"

# Cloudinary
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"

# Server
PORT=3000
NODE_ENV="development"
```

### 3. Configurar base de datos

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate
```

### 4. Crear usuario admin inicial

```bash
# POST /api/auth/register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portafolio.com","password":"tu_contraseña"}'
```

## 🏃 Ejecutar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Autenticación

**POST /api/auth/register**
- Crear nuevo admin
- Body: `{ email, password }`

**POST /api/auth/login**
- Login de admin
- Body: `{ email, password }`
- Retorna: `{ token, user }`

### Proyectos (requieren token en header)

**GET /api/projects**
- Obtener todos los proyectos

**GET /api/projects/:id**
- Obtener proyecto por ID

**POST /api/projects** (protegido)
- Crear nuevo proyecto
- Headers: `Authorization: Bearer {token}`
- Body: FormData
  - `name`: string
  - `description`: string
  - `technology`: array o string (ej: "React,TypeScript,Tailwind")
  - `url`: string (opcional)
  - `github`: string (opcional)
  - `thumbnail`: File (imagen de portada)

**PUT /api/projects/:id** (protegido)
- Actualizar proyecto
- Headers: `Authorization: Bearer {token}`
- Body: FormData (mismo formato que POST)
- Opciones: actualizar solo los campos que necesites

**POST /api/projects/:id/images** (protegido)
- Agregar imagen o video al proyecto
- Headers: `Authorization: Bearer {token}`
- Body: FormData
  - `image`: File (imagen o video)
  - `alt`: string (descripción)
  - `category`: string (categoría de la imagen)
  - `type`: string ("image" o "video")
  - `thumbnail`: File (opcional, solo si es video)

**DELETE /api/projects/:projectId/images/:imageId** (protegido)
- Eliminar imagen del proyecto
- Headers: `Authorization: Bearer {token}`

**DELETE /api/projects/:id** (protegido)
- Eliminar proyecto completo
- Headers: `Authorization: Bearer {token}`

## 🔐 Obtener Token

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portafolio.com","password":"tu_contraseña"}'

# Uso del token
curl -H "Authorization: Bearer {tu_token}" http://localhost:3000/api/projects
```

## 📦 Estructura de datos

### Project
```typescript
{
  id: number
  name: string
  description: string
  url?: string
  github?: string
  image: string (URL de Cloudinary)
  technology: string[]
  images: ProjectImage[]
  createdAt: Date
  updatedAt: Date
}
```

### ProjectImage
```typescript
{
  id: number
  projectId: number
  src: string (URL de Cloudinary)
  alt: string
  category: string
  type: "image" | "video"
  thumbnail?: string (URL de Cloudinary, solo para videos)
  createdAt: Date
  updatedAt: Date
}
```

## 🛠️ Comandos útiles

```bash
# Ver BD con Prisma Studio
npm run prisma:studio

# Generar cliente Prisma
npm run prisma:generate

# Crear nueva migración
npm run prisma:migrate
```

## 📝 Notas

- Las imágenes se suben automáticamente a Cloudinary
- Las URLs de Cloudinary se guardan en la BD
- El almacenamiento en Cloudinary es ilimitado (según tu plan)
- Los tokens JWT expiran en 7 días (configurable en `.env`)
- La carpeta `/tmp/` se usa para archivos temporales al subir
