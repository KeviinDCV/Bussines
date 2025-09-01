@echo off
echo Solucionando errores del sistema...

echo.
echo [1/8] Deteniendo servidor...
taskkill /f /im php.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

echo.
echo [2/8] Limpiando cache de Laravel...
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

echo.
echo [3/8] Limpiando cache de Composer...
composer dump-autoload

echo.
echo [4/8] Eliminando cache de Vite...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist "public\build" rmdir /s /q "public\build"

echo.
echo [5/8] Reinstalando dependencias de Node...
npm install

echo.
echo [6/8] Reconstruyendo assets...
npm run build

echo.
echo [7/8] Optimizando Laravel...
php artisan optimize

echo.
echo [8/8] Iniciando servidor...
start /b php artisan serve

echo.
echo ✅ Errores solucionados!
echo El servidor está ejecutándose en http://localhost:8000
pause
