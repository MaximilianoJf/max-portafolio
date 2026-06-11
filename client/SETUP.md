# 🚀 Guía de Instalación - Sistema Completo Portafolio

## Requisitos Previos

- Node.js (v16+)
- PostgreSQL instalado y corriendo
- Cuenta en Cloudinary (gratuita en cloudinary.com)

---

## 📋 PASO 1: Configurar Base de Datos PostgreSQL

### Crear base de datos

```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE portafolio_db;

# Salir
\q
```

### Obtener DATABASE_URL

```
postgresql://usuario:contraseña@localhost:5432/portafolio_db
```

---

## ☁️ PASO 2: Configurar Cloudinary

1. Ir a https://cloudinary.com/users/register/free
2. Crear cuenta gratuita
3. Ir al Dashboard
4. Copiar:
   - Cloud Name
   - API Key
   - API Secret

---

## 🔧 PASO 3: Configurar Backend

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Crear archivo .env

Copiar `.env.example` a `.env`:

```bash
cp .env.example .env
```

Llenar con tus valores:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/portafolio_db"
JWT_SECRET="genera_una_clave_aleatoria_segura_aqui"
JWT_EXPIRE="7d"
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
PORT=3000
NODE_ENV="development"
```

### 3. Configurar base de datos

```bash
# Generar cliente Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate
```

### 4. Crear usuario admin

Ejecutar backend:

```bash
npm run dev
```

En otra terminal, crear admin:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@portafolio.com",
    "password": "tu_contraseña_segura"
  }'
```

Copiar el token que retorna.

---

## 🎨 PASO 4: Configurar Frontend

### 1. Crear archivo .env

En la raíz del proyecto (portafolio final MJ):

```bash
cp .env.example .env
```

### 2. Llenar variables

```env
VITE_API_URL=http://localhost:3000/api
```

---

## ▶️ PASO 5: Ejecutar Proyecto

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Verás: `🚀 Server running on http://localhost:3000`

### Terminal 2 - Frontend

```bash
npm run dev
```

Verás: `Local: http://localhost:5173`

---

## 🔐 PASO 6: Acceder al Panel Admin

1. Ir a http://localhost:5173/#/admin
2. Loguear con:
   - Email: `admin@portafolio.com`
   - Contraseña: la que creaste

---

## 📚 API Endpoints

Todos requieren agregar token en header:

```
Authorization: Bearer {tu_token}
```

### Autenticación

- **POST /api/auth/login** - Login
- **POST /api/auth/register** - Crear nuevo admin

### Proyectos

- **GET /api/projects** - Obtener todos (público)
- **GET /api/projects/:id** - Obtener uno (público)
- **POST /api/projects** - Crear (protegido)
- **PUT /api/projects/:id** - Actualizar (protegido)
- **DELETE /api/projects/:id** - Eliminar (protegido)
- **POST /api/projects/:id/images** - Agregar imagen (protegido)
- **DELETE /api/projects/:projectId/images/:imageId** - Eliminar imagen (protegido)

---

## 🧪 Probar Crear Proyecto

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer tu_token" \
  -F "name=Mi Proyecto" \
  -F "description=Descripción del proyecto" \
  -F "technology=React,TypeScript,Tailwind" \
  -F "url=https://ejemplo.com" \
  -F "github=https://github.com/usuario/repo" \
  -F "thumbnail=@/ruta/a/imagen.png"
```

---

## 📦 Estructura de Carpetas

```
portafolio final MJ/
├── src/
│   ├── components/
│   ├── pages/
│   │   └── AdminPanel.tsx
│   ├── data/
│   ├── App.tsx
│   └── index.css
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   └── package.json
├── .env
└── package.json
```

---

## 🐛 Troubleshooting

### Error: "DATABASE_URL not found"

- Verifica que el archivo `.env` existe en `/backend`
- Verifica que DATABASE_URL está correctamente formateado

### Error: Port 3000 already in use

```bash
# En Windows
netstat -ano | findstr :3000

# En Mac/Linux
lsof -i :3000
```

### Error: Cloudinary upload failed

- Verifica que CLOUDINARY_CLOUD_NAME, API_KEY y API_SECRET son correctos
- Prueba en https://cloudinary.com/console

### Error: "Invalid or expired token"

- El token de admin expira en 7 días
- Vuelve a loguear con POST /api/auth/login

---

## 📝 Variables de Entorno Completamente Llenar

### Backend (.env)

```env
# REQUERIDO - Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/portafolio_db"

# REQUERIDO - JWT (genera una clave aleatoria)
JWT_SECRET="tu_clave_super_secreta_cambiar_en_produccion"
JWT_EXPIRE="7d"

# REQUERIDO - Cloudinary
CLOUDINARY_CLOUD_NAME="tu_cloud_name_aqui"
CLOUDINARY_API_KEY="tu_api_key_aqui"
CLOUDINARY_API_SECRET="tu_api_secret_aqui"

# Opcional
PORT=3000
NODE_ENV="development"
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

---

## ✅ Checklist de Configuración

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos `portafolio_db` creada
- [ ] Cuenta Cloudinary creada
- [ ] Backend `.env` configurado
- [ ] `npm run prisma:migrate` ejecutado
- [ ] Usuario admin creado con POST /register
- [ ] Frontend `.env` configurado
- [ ] Backend corriendo en puerto 3000
- [ ] Frontend corriendo en puerto 5173
- [ ] Panel admin accesible en /#/admin

---

## 📞 Soporte

Si tienes problemas, verifica:
1. Console del navegador (F12) para errores frontend
2. Terminal del backend para errores server
3. Logs de Cloudinary en su dashboard

¡Todo configurado! 🎉
