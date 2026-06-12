// =============================================================
// WEBSOCKET CLIENT - APP DE NOTIFICACIONES (CELULAR)
// =============================================================
// Este archivo conecta el celular al servidor WebSocket.
// 
// RECIBE:
//   - "start"  → desbloquea la pantalla y arranca las notificaciones
//   - "stop"   → detiene las notificaciones y vuelve a pantalla negra
//   - "reset"  → reinicia todo para el siguiente visitante
//
// ENVÍA:
//   - "identificar" → le dice al servidor "soy el celular"
//   - "gasto"       → avisa que una notificación con afectaSaldo:true apareció
// =============================================================

// --- CONFIGURACIÓN ---
// Cambiar esta IP por la de la notebook cuando estén en la misma red Wi-Fi.
// Para saber la IP: abrir terminal en la notebook y escribir "ipconfig" (Windows).
// Buscar "Dirección IPv4" en el adaptador Wi-Fi (ej: 192.168.1.45).
// IMPORTANTE: mientras estés probando en la misma PC, usá "localhost".
let WS_URL = 'ws://localhost:8080';

let ws = null;
let conectado = false;

// --- CONECTAR AL SERVIDOR ---
function conectarWebSocket() {
  console.log('Intentando conectar a:', WS_URL);

  ws = new WebSocket(WS_URL);

  // Cuando la conexión se abre
  ws.onopen = function() {
    console.log('Conectado al servidor WebSocket');
    conectado = true;

    // Identificarse como "celular"
    ws.send(JSON.stringify({
      tipo: 'identificar',
      rol: 'celular'
    }));
  };

  // Cuando llega un mensaje del servidor
  ws.onmessage = function(evento) {
    let datos;
    try {
      datos = JSON.parse(evento.data);
    } catch (error) {
      console.log('Mensaje no válido:', evento.data);
      return;
    }

    console.log('Mensaje recibido:', datos.tipo);

    // --- START: la notebook dice que arranque ---
    if (datos.tipo === 'start') {
      desbloquearDesdeWebSocket();
    }

    // --- STOP: la notebook dice que pare ---
    if (datos.tipo === 'stop') {
      detenerDesdeWebSocket();
    }

    // --- RESET: la notebook dice que se reinicie ---
    if (datos.tipo === 'reset') {
      resetearDesdeWebSocket();
    }

    // --- IDENTIFICADO: confirmación del servidor ---
    if (datos.tipo === 'identificado') {
      console.log('Servidor confirmó:', datos.mensaje);
    }
  };

  // Cuando la conexión se cierra
  ws.onclose = function() {
    console.log('Conexión cerrada. Reintentando en 3 segundos...');
    conectado = false;

    // Reintentar conexión automáticamente
    setTimeout(function() {
      conectarWebSocket();
    }, 3000);
  };

  // Cuando hay un error
  ws.onerror = function(error) {
    console.log('Error de WebSocket:', error);
  };
}

// --- ENVIAR GASTO AL SERVIDOR ---
// Se llama desde main.js cada vez que aparece una notificación con afectaSaldo: true.
function enviarGasto(noti) {
  if (conectado && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      tipo: 'gasto',
      id: noti.id,
      origen: noti.nombreApp,
      monto: noti.monto
    }));
    console.log('Gasto enviado:', noti.nombreApp, '-$' + noti.monto);
  }
}

// --- FUNCIONES QUE SE LLAMAN DESDE LOS MENSAJES ---
// Estas funciones interactúan con main.js.
// Se definen acá como "puente" y main.js las completa.

function desbloquearDesdeWebSocket() {
  // Simula lo que hace el tap en pantalla 1: desbloquear y arrancar caos
  if (typeof pantalla1 !== 'undefined' && typeof pantalla2 !== 'undefined') {
    pantalla1.classList.add('desbloqueando');

    setTimeout(function() {
      pantalla1.classList.remove('disp', 'desbloqueando');
      pantalla1.classList.add('no-disp');
      pantalla2.classList.remove('no-disp');
      pantalla2.classList.add('disp');

      setTimeout(function() {
        chaosStarted = true;
        scheduleChaos();
      }, 1000);
    }, 400);
  }
}

function detenerDesdeWebSocket() {
  // Detiene las notificaciones y vuelve a pantalla negra
  chaosStarted = false;

  // Limpiar notificaciones activas
  activeNotifications.forEach(function(notifObj) {
    clearTimeout(notifObj.timeout);
    forceRemove(notifObj.element);
  });
  activeNotifications = [];

  // Volver a pantalla 1 (negra, sin hora, solo negro)
  pantalla2.classList.remove('disp');
  pantalla2.classList.add('no-disp');
  pantalla1.classList.remove('no-disp');
  pantalla1.classList.add('disp');

  // Limpiar badges
  whatsappCount = 0;
  bancoCount = 0;
  gmailCount = 0;
  calendarioCount = 0;
  whatsappBadge.style.display = 'none';
  bancoBadge.style.display = 'none';
  gmailBadge.style.display = 'none';
  calendarioBadge.style.display = 'none';

  // Limpiar contenedor de notificaciones
  notificationContainer.innerHTML = '';
}

function resetearDesdeWebSocket() {
  // Igual que detener, pero se asegura de dejar todo limpio
  detenerDesdeWebSocket();
  isInPeaceMode = false;
}

// --- INICIAR CONEXIÓN ---
conectarWebSocket();