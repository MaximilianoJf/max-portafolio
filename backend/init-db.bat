@echo off
REM Script para inicializar la base de datos en Windows

echo.
echo 🗄️  Inicializando base de datos...
echo.

REM Generar cliente Prisma
echo 📦 Generando cliente Prisma...
call npm run prisma:generate

REM Ejecutar migraciones
echo 📝 Ejecutando migraciones...
call npm run prisma:migrate

echo.
echo ✅ Base de datos inicializada exitosamente!
echo.
echo Próximos pasos:
echo 1. Inicia el backend: npm run dev
echo 2. Crea un usuario admin con POST /api/auth/register
echo 3. Usa el token para subir proyectos
echo.
pause
