# 🔒 SEGURIDAD - Business Intelligence HUV

## ⚠️ DATOS CONFIDENCIALES
Este sistema maneja **datos extremadamente confidenciales** del Hospital Universitario del Valle. Se han implementado múltiples capas de seguridad para proteger la información sensible.

## 🛡️ MEDIDAS DE SEGURIDAD IMPLEMENTADAS

### 1. **Control de Acceso Estricto**
- ✅ Usuarios autenticados **NO pueden acceder** a la página de login (redirección automática)
- ✅ Usuarios **NO autenticados NO pueden acceder** a NINGUNA página (redirección inmediata al login)
- ✅ Protección total de rutas sin excepciones

### 2. **Middleware de Seguridad**
- **`RedirectIfAuthenticated`**: Redirige usuarios logueados lejos del login
- **`AuthenticateStrict`**: Protege todas las rutas excepto login con verificación estricta
- **`SecurityHeaders`**: Headers de seguridad (CSP, X-Frame-Options, etc.)
- **`SessionTimeout`**: Timeout automático de sesión por inactividad
- **`RateLimitLogin`**: Límite de intentos de login (5 intentos/15 min)
- **`AuditLogger`**: Registro de actividades para auditoría

### 3. **Configuración de Sesión Segura**
- **Tiempo de vida**: 30 minutos (reducido para datos confidenciales)
- **Expiración**: Al cerrar navegador
- **Encriptación**: Datos de sesión encriptados
- **Cookies seguras**: HttpOnly, SameSite configurado

### 4. **Headers de Seguridad**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: Política estricta implementada
Cache-Control: no-cache para páginas sensibles
```

### 5. **Rate Limiting**
- **Login**: Máximo 5 intentos por IP cada 15 minutos
- **Bloqueo temporal**: Cuenta bloqueada temporalmente tras exceder límite

### 6. **Auditoría y Logs**
- **Canal de seguridad**: Logs separados para eventos de seguridad
- **Retención**: 90 días de logs de seguridad
- **Eventos registrados**:
  - Acceso a áreas protegidas
  - Operaciones administrativas
  - Intentos de acceso no autorizados
  - Cambios en datos sensibles

## 🔐 RECOMENDACIONES ADICIONALES

### Para Administradores del Sistema:
1. **Monitorear logs de seguridad** regularmente en `storage/logs/security.log`
2. **Revisar intentos de acceso** no autorizados
3. **Configurar alertas** para actividades sospechosas
4. **Mantener actualizado** el sistema y dependencias
5. **Realizar auditorías** de seguridad periódicas

### Para el Entorno de Producción:
1. **HTTPS obligatorio** - Configurar SSL/TLS
2. **Firewall** - Restringir acceso por IP si es posible
3. **Base de datos** - Conexión encriptada y credenciales seguras
4. **Backups** - Encriptados y almacenados de forma segura
5. **Variables de entorno** - Nunca exponer credenciales

## 📋 VARIABLES DE ENTORNO CRÍTICAS

```env
# Sesión segura
SESSION_LIFETIME=30
SESSION_EXPIRE_ON_CLOSE=true
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true

# Logs de seguridad
LOG_SECURITY_DAYS=90

# Base de datos (usar credenciales seguras)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=business_intelligence_huv
DB_USERNAME=secure_user
DB_PASSWORD=secure_password
```

## 🚨 PROTOCOLO DE INCIDENTES

### En caso de actividad sospechosa:
1. **Revisar logs** de seguridad inmediatamente
2. **Bloquear IP** sospechosa si es necesario
3. **Notificar** al equipo de seguridad
4. **Documentar** el incidente
5. **Revisar** accesos y permisos

### Contacto de Emergencia:
- **Administrador del Sistema**: [Definir contacto]
- **Equipo de Seguridad**: [Definir contacto]

---

**⚠️ IMPORTANTE**: Este documento debe mantenerse actualizado y ser revisado regularmente por el equipo de seguridad del HUV.
