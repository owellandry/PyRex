# PxConfig.pyx

# Puerto por defecto en el que corre el servidor
server_port = 6500

# Directorio de archivos públicos
public_dir = "public"

# Configuración del WebSocket
websocket_port = 8080

# Tiempo máximo para reconectar el WebSocket en milisegundos
websocket_reconnect_timeout = 5000

# Rutas para diferentes archivos o módulos
routes = {
    "index": "index.html",
    "styles": "style.css",
}

# Habilitar el log de errores detallados
debug_mode = True

# Configuración de mensajes
messages = {
    "start_success": "[SERVIDOR] correcto: Server started on",
    "start_error": "[SERVIDOR] error: Failed to start",
    "stop_prompt": "¿Está seguro de que desea detener el servidor? (s/n)",
    "stop_confirmed": "[SERVIDOR] Servidor detenido correctamente.",
    "stop_cancelled": "[SERVIDOR] Detención cancelada.",
}

# Tiempo de espera para la recarga automática en milisegundos
reload_timeout = 3000
