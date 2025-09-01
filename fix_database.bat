@echo off
echo Solucionando problemas de base de datos...

echo.
echo 1. Eliminando y recreando la base de datos...
mysql -u root -e "DROP DATABASE IF EXISTS business_intelligence_huv;"
mysql -u root -e "CREATE DATABASE business_intelligence_huv;"

echo.
echo 2. Ejecutando migraciones frescas...
php artisan migrate:fresh --seed --force

echo.
echo 3. Verificando usuarios creados...
php artisan tinker --execute="echo 'Usuarios en BD: ' . \App\Models\User::count();"

echo.
echo 4. Limpiando cache...
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo.
echo Base de datos configurada correctamente!
echo.
pause
