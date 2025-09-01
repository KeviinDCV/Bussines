@echo off
echo Configurando Business Intelligence HUV...

echo.
echo 1. Creando base de datos MySQL...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS business_intelligence_huv;"

echo.
echo 2. Copiando archivo de entorno...
copy .env.example .env

echo.
echo 3. Generando clave de aplicacion...
php artisan key:generate --force

echo.
echo 4. Limpiando cache...
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo.
echo 5. Ejecutando migraciones...
php artisan migrate --force

echo.
echo 6. Ejecutando seeders...
php artisan db:seed --force

echo.
echo 7. Instalando dependencias de Node.js...
npm install

echo.
echo Setup completado!
echo.
echo Para iniciar el servidor:
echo npm run dev
echo php artisan serve
echo.
pause
