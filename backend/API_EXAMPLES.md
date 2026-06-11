# 📚 Ejemplos de API - Backend Portafolio

Base URL: `http://localhost:3000/api`

---

## 🔐 AUTENTICACIÓN

### 1. Registrar nuevo admin

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@portafolio.com",
    "password": "tu_contraseña_segura"
  }'
```

**Respuesta exitosa (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@portafolio.com"
  }
}
```

---

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@portafolio.com",
    "password": "tu_contraseña_segura"
  }'
```

**Respuesta exitosa (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@portafolio.com"
  }
}
```

---

## 📦 PROYECTOS

### 3. Obtener todos los proyectos (PÚBLICO - sin token)

```bash
curl -X GET http://localhost:3000/api/projects
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Mi Proyecto",
    "description": "Descripción del proyecto",
    "image": "https://res.cloudinary.com/...",
    "technology": ["React", "TypeScript"],
    "url": "https://ejemplo.com",
    "github": "https://github.com/...",
    "images": [
      {
        "id": 1,
        "src": "https://res.cloudinary.com/...",
        "alt": "Descripción",
        "category": "Dashboard",
        "type": "image"
      }
    ],
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
]
```

---

### 4. Obtener un proyecto por ID (PÚBLICO)

```bash
curl -X GET http://localhost:3000/api/projects/1
```

---

### 5. Crear nuevo proyecto (PROTEGIDO)

Requiere autenticación:

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer tu_token_aqui" \
  -F "name=Sistema GDOC" \
  -F "description=Sistema central para el área de prevención de riesgos" \
  -F "technology=Laravel,React,MySQL" \
  -F "url=https://gssma.guinezapp.cl" \
  -F "github=https://github.com/usuario/repo" \
  -F "thumbnail=@/ruta/a/imagen.png"
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "name": "Sistema GDOC",
  "description": "Sistema central para el área de prevención de riesgos",
  "image": "https://res.cloudinary.com/...",
  "technology": ["Laravel", "React", "MySQL"],
  "url": "https://gssma.guinezapp.cl",
  "github": "https://github.com/usuario/repo",
  "createdAt": "2024-01-20T10:30:00.000Z",
  "updatedAt": "2024-01-20T10:30:00.000Z"
}
```

---

### 6. Agregar imagen a un proyecto (PROTEGIDO)

```bash
curl -X POST http://localhost:3000/api/projects/1/images \
  -H "Authorization: Bearer tu_token_aqui" \
  -F "image=@/ruta/a/imagen.png" \
  -F "alt=Pantalla del módulo SSTMA" \
  -F "category=Programa Calidad SST y MA" \
  -F "type=image"
```

**Para videos:**

```bash
curl -X POST http://localhost:3000/api/projects/1/images \
  -H "Authorization: Bearer tu_token_aqui" \
  -F "image=@/ruta/a/video.mp4" \
  -F "thumbnail=@/ruta/a/thumbnail.png" \
  -F "alt=Video introductorio" \
  -F "category=Demostración" \
  -F "type=video"
```

---

### 7. Actualizar proyecto (PROTEGIDO)

```bash
curl -X PUT http://localhost:3000/api/projects/1 \
  -H "Authorization: Bearer tu_token_aqui" \
  -F "name=Sistema GDOC Actualizado" \
  -F "description=Nueva descripción" \
  -F "technology=Laravel,React,MySQL,PostgreSQL" \
  -F "thumbnail=@/ruta/a/nueva_imagen.png"
```

---

### 8. Eliminar imagen de un proyecto (PROTEGIDO)

```bash
curl -X DELETE http://localhost:3000/api/projects/1/images/5 \
  -H "Authorization: Bearer tu_token_aqui"
```

---

### 9. Eliminar proyecto completo (PROTEGIDO)

```bash
curl -X DELETE http://localhost:3000/api/projects/1 \
  -H "Authorization: Bearer tu_token_aqui"
```

---

## 🧪 Variables para Usar en tus Comandos

Guarda el token después de login:

```bash
# Guardar token en variable (bash/Linux/Mac)
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portafolio.com","password":"contraseña"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo $TOKEN

# Usar el token
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📋 Estructura de Datos

### Project
```typescript
{
  id: number
  name: string
  description: string
  url?: string
  github?: string
  image: string  // URL Cloudinary
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
  src: string  // URL Cloudinary
  alt: string
  category: string
  type: "image" | "video"
  thumbnail?: string  // URL Cloudinary (solo videos)
  createdAt: Date
  updatedAt: Date
}
```

### User
```typescript
{
  id: number
  email: string
  password: string  // hash bcrypt
  createdAt: Date
  updatedAt: Date
}
```

---

## ✅ Checklist de Pruebas

- [ ] POST /auth/register - Crear admin
- [ ] POST /auth/login - Login y obtener token
- [ ] GET /projects - Obtener todos (sin token)
- [ ] POST /projects - Crear proyecto (con token)
- [ ] POST /projects/:id/images - Agregar imagen
- [ ] PUT /projects/:id - Actualizar
- [ ] DELETE /projects/:id/images/:imageId - Eliminar imagen
- [ ] DELETE /projects/:id - Eliminar proyecto

---

## 🐛 Códigos de Error

| Código | Significado |
|--------|-------------|
| 200 | OK - Éxito |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Sin autorización/token inválido |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Recurso duplicado (email existe) |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Headers Requeridos

Todas las rutas protegidas requieren:

```
Authorization: Bearer {tu_token_jwt}
```

El token tiene formato JWT y expira en 7 días.
