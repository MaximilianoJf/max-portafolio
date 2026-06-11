#!/bin/bash

# Script para inicializar la base de datos

echo "🗄️  Inicializando base de datos..."

# Generar cliente Prisma
echo "📦 Generando cliente Prisma..."
npm run prisma:generate

# Ejecutar migraciones
echo "📝 Ejecutando migraciones..."
npm run prisma:migrate

echo "✅ Base de datos inicializada exitosamente!"
echo ""
echo "Próximos pasos:"
echo "1. Inicia el backend: npm run dev"
echo "2. Crea un usuario admin con POST /api/auth/register"
echo "3. Usa el token para subir proyectos"
