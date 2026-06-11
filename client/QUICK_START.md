# ⚡ Quick Start - Sistema Completo

## 🚀 5 Minutos para tener todo funcionando

### 1️⃣ Copiar archivos de configuración

```bash
# Frontend
cp .env.example .env

# Backend
cd backend
cp .env.example .env
cd ..
```

### 2️⃣ Llenar variables de entorno

#### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:3000/api
```

#### Backend (`.backend/.env`)
```env
DATABASE_URL="postgresql://tu_usuario:tu_contraseña@localhost:5432/portafolio_db"
JWT_SECRET="cambiar_a_una_clave_aleatoria_segura"
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
PORT=3000
NODE_ENV="development"
```

### 3️⃣ Instalar y configurar backend

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
```

### 4️⃣ Instalar frontend

```bash
npm install
```

### 5️⃣ Ejecutar en 2 terminales

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6️⃣ Crear usuario admin

En otra terminal:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portafolio.com","password":"tu_contraseña"}'
```

Copiar el `token` que retorna.

### 7️⃣ Acceder al panel

1. Abre http://localhost:5173/#/admin
2. Usa email: `admin@portafolio.com` y tu contraseña
3. ¡A subir proyectos!

---

## ⚙️ Configuración Cloudinary

1. Ve a https://cloudinary.com/users/register/free
2. Crea cuenta
3. En Dashboard, copia:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## 📁 Estructura Backend Creada

```
backend/
├── src/
│   ├── index.ts           (servidor principal)
│   ├── middleware/
│   │   └── auth.ts        (verificación de token)
│   ├── routes/
│   │   ├── auth.ts        (login/register)
│   │   └── projects.ts    (CRUD de proyectos)
│   └── utils/
│       ├── jwt.ts         (generación de tokens)
│       └── cloudinary.ts  (upload de imágenes)
├── prisma/
│   └── schema.prisma      (modelos de BD)
├── .env.example
└── package.json
```

---

## 🎯 Endpoints Principales

| Método | Ruta | Descripción | Token |
|--------|------|-------------|-------|
| POST | /auth/login | Iniciar sesión | ❌ |
| POST | /auth/register | Crear admin | ❌ |
| GET | /projects | Ver todos | ❌ |
| POST | /projects | Crear | ✅ |
| PUT | /projects/:id | Actualizar | ✅ |
| DELETE | /projects/:id | Eliminar | ✅ |
| POST | /projects/:id/images | Agregar imagen | ✅ |
| DELETE | /projects/:id/images/:imgId | Eliminar imagen | ✅ |

---

## 🔑 Usar Token en Requests

```bash
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer tu_token_aqui"
```

---

## 📚 Documentación Completa

- **SETUP.md** - Guía detallada paso a paso
- **backend/README.md** - Documentación del backend
- **backend/API_EXAMPLES.md** - Ejemplos de todas las rutas
- **backend/init-db.sh** o **.bat** - Script de inicialización

---

## ✅ Verificar que todo funciona

```bash
# Verificar backend
curl http://localhost:3000/api/health
# Debe retornar: {"status": "Backend running"}

# Verificar frontend
# Abre http://localhost:5173 en navegador
```

---

## 🆘 Problemas Comunes

**Base de datos no crea:**
```bash
# Verifica conexión
psql -U postgres -d portafolio_db

# Si no existe, crea:
psql -U postgres
CREATE DATABASE portafolio_db;
```

**Puerto 3000 en uso:**
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

**Error: "CLOUDINARY_CLOUD_NAME" not found:**
- Verifica que `.env` existe en `/backend`
- Verifica que las variables están sin espacios

---

## 🎬 Próximos Pasos

1. ✅ Backend corriendo
2. ✅ Panel admin accesible
3. ⏭️ Subir tus proyectos
4. ⏭️ Las imágenes se guardan automáticamente en Cloudinary
5. ⏭️ El frontend consume de la BD

---

## 💡 Tips

- El token expira en 7 días, vuelve a loguear si expira
- Las imágenes se comprimen automáticamente en Cloudinary
- Puedes editar proyectos desde el panel (botón "Editar" en desarrollo)
- Los datos se sincronizan automáticamente con el frontend

---

¡Listo! 🎉 Tu sistema completo está funcionando.
