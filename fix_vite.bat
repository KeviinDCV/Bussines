@echo off
echo Solucionando error de Vite manifest...

echo.
echo 1. Deteniendo procesos de Node.js...
taskkill /f /im node.exe 2>nul || echo "No hay procesos Node.js ejecutandose"

echo.
echo 2. Limpiando cache de npm...
npm cache clean --force

echo.
echo 3. Eliminando node_modules y reinstalando...
rmdir /s /q node_modules 2>nul || echo "node_modules no existe"
del package-lock.json 2>nul || echo "package-lock.json no existe"
npm install

echo.
echo 4. Limpiando build anterior...
rmdir /s /q public\build 2>nul || echo "No hay build anterior"

echo.
echo 5. Iniciando Vite en modo desarrollo...
start "Vite Dev Server" cmd /k "npm run dev"

echo.
echo 6. Esperando 5 segundos para que Vite inicie...
timeout /t 5 /nobreak

echo.
echo Vite configurado correctamente!
echo Ahora puedes acceder a http://127.0.0.1:8000/login
echo.
pause
