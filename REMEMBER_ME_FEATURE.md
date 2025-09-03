# Funcionalidad "Mantener Sesión Iniciada" (Remember Me)

## 📋 Descripción

Esta funcionalidad permite a los usuarios mantener su sesión activa por un período extendido (por defecto 1 año) sin necesidad de volver a autenticarse, incluso después de cerrar el navegador.

## ✅ Funcionalidades Implementadas

### 1. Frontend (Login.tsx)
- **Checkbox agregado**: "Mantener sesión iniciada" en el formulario de login
- **Interfaz actualizada**: Campo `remember` integrado en el formulario
- **Validación**: Estado del checkbox se envía correctamente al backend
- **Estilo consistente**: Usa los colores del tema de la aplicación (#2a3d85)

### 2. Backend (AuthController.php)
- **Validación**: Campo `remember` como boolean opcional
- **Autenticación**: `Auth::attempt()` con parámetro remember
- **Logs**: Registro de intentos de login con información del remember
- **Seguridad**: Mantiene todas las validaciones de seguridad existentes

### 3. Middleware (SessionTimeout.php)
- **Detección inteligente**: Usa `Auth::viaRemember()` para detectar usuarios con cookie remember
- **Bypass de timeout**: Usuarios con remember token NO tienen timeout de sesión por inactividad
- **Actividad tracking**: Mantiene registro de actividad para ambos tipos de usuarios

### 4. Configuración
- **Duración personalizable**: 1 año por defecto (525,600 minutos)
- **Variable de entorno**: `AUTH_REMEMBER_DURATION` configurable en `.env`
- **AppServiceProvider**: Configuración automática al iniciar la aplicación

## 🔧 Cómo Funciona

### Cuando el usuario NO marca el checkbox:
- ✅ Sesión normal con timeout (2 horas por defecto)
- ✅ Se cierra automáticamente por inactividad según `SESSION_LIFETIME`
- ✅ Comportamiento actual mantenido sin cambios

### Cuando el usuario SÍ marca el checkbox:
- ✅ Se crea una cookie "remember me" que dura 1 año
- ✅ **NO hay timeout de sesión** por inactividad
- ✅ La sesión se mantiene hasta que el usuario haga logout manualmente
- ✅ Incluso si cierra el navegador, la sesión persiste al volver

## ⚙️ Configuración

### Variables de Entorno (.env)

```env
# Duración del token "remember me" en minutos
# 525600 = 1 año (por defecto)
# 43200 = 1 mes
# 10080 = 1 semana
# 1440 = 1 día
AUTH_REMEMBER_DURATION=525600
```

### Archivos Modificados

1. **resources/js/pages/Auth/Login.tsx**
   - Agregado checkbox "Mantener sesión iniciada"
   - Campo `remember` en el formulario

2. **app/Http/Controllers/AuthController.php**
   - Validación del campo `remember`
   - Uso de `Auth::attempt($credentials, $remember)`
   - Logs de depuración

3. **app/Http/Middleware/SessionTimeout.php**
   - Detección de usuarios con remember token
   - Bypass de timeout para usuarios con remember

4. **config/auth.php**
   - Configuración `remember_duration`

5. **app/Providers/AppServiceProvider.php**
   - Configuración automática de duración del token

6. **.env.example**
   - Variable `AUTH_REMEMBER_DURATION` documentada

## 🧪 Testing

La funcionalidad ha sido probada con:
- ✅ Login sin checkbox (comportamiento normal)
- ✅ Login con checkbox (creación de remember token)
- ✅ Verificación de bypass de timeout
- ✅ Configuración correcta aplicada

## 🚀 Uso

### Para Usuarios:
1. Ir al formulario de login
2. Marcar el checkbox "Mantener sesión iniciada"
3. Iniciar sesión normalmente
4. La sesión se mantendrá activa indefinidamente hasta logout manual

### Para Administradores:
- Configurar `AUTH_REMEMBER_DURATION` en `.env` según necesidades de seguridad
- Monitorear logs de autenticación para troubleshooting
- Los usuarios con remember token no aparecerán en logs de timeout

## 🔒 Consideraciones de Seguridad

- **Tokens seguros**: Laravel genera tokens criptográficamente seguros
- **Rotación automática**: Los tokens se regeneran en cada login
- **Logout completo**: El logout manual elimina todos los tokens
- **Configuración flexible**: Duración ajustable según políticas de seguridad

## 📊 Logs

Los logs incluyen información sobre:
- Intentos de login con/sin remember
- Creación de remember tokens
- Detección de usuarios via remember
- Bypass de timeout para usuarios con remember

Ubicación: `storage/logs/laravel.log`

## 🔄 Mantenimiento

- **Limpieza automática**: Laravel limpia tokens expirados automáticamente
- **Monitoreo**: Revisar logs regularmente para detectar patrones
- **Configuración**: Ajustar `AUTH_REMEMBER_DURATION` según necesidades

---

**Implementado por**: Kiro AI Assistant  
**Fecha**: Diciembre 2024  
**Versión**: 1.0