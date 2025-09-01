@echo off
echo Limpiando cache de Laravel y Vite...

echo.
echo [1/6] Limpiando cache de configuracion...
php artisan config:clear

echo.
echo [2/6] Limpiando cache de rutas...
php artisan route:clear

echo.
echo [3/6] Limpiando cache de vistas...
php artisan view:clear

echo.
echo [4/6] Limpiando cache de aplicacion...
php artisan cache:clear

echo.
echo [5/6] Optimizando autoloader...
composer dump-autoload

echo.
echo [6/6] Reiniciando servidor...
taskkill /f /im php.exe >nul 2>&1
timeout /t 2 >nul

echo.
echo ✅ Cache limpiado exitosamente!
echo Reinicia el servidor con: php artisan serve
pause
