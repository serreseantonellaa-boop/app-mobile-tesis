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
//   - "identificar"  → le dice al servidor "soy el celular"
//   - "gasto"        → avisa que una notificación con afectaSaldo:true apareció
//   - "notificacion" → envía TODAS las notificaciones para que aparezcan en la notebook
// =============================================================

// --- CONFIGURACIÓN ---
// Cambiar esta IP por la de la notebook cuando estén en la misma red Wi-Fi.
// Para saber la IP: abrir terminal en la notebook y escribir "ipconfig" (Windows).
// Buscar "Dirección IPv4" en el adaptador Wi-Fi (ej: 192.168.1.45).
// IMPORTANTE: mientras estés probando en la misma PC, usá "localhost".
// IP de la notebook en la red donde se monta la instalación.
// Se averigua en la notebook con: cmd > ipconfig > "Dirección IPv4".
//   Casa:     192.168.1.51
//   Facultad: 120.120.0.166
let WS_URL = 'ws://192.168.1.51:8080';

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
// Solo envía los datos que la notebook necesita para descontar del presupuesto.
function enviarGasto(noti) {
  if (conectado && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      tipo: 'gasto',
      id: noti.id,
      origen: noti.nombreApp,
      mensaje: noti.mensaje,
      monto: noti.monto
    }));
    console.log('Gasto enviado:', noti.nombreApp, '-$' + noti.monto);
  }
}

// --- ENVIAR NOTIFICACIÓN AL SERVIDOR ---
// Se llama desde main.js para TODAS las notificaciones (gastos y no gastos).
// La notebook las muestra como notificaciones estilo Windows 11 en pantalla.
function enviarNotificacion(noti) {
  if (conectado && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      tipo: 'notificacion',
      id: noti.id,
      nombreApp: noti.nombreApp,
      mensaje: noti.mensaje,
      categoria: noti.categoria,
      afectaSaldo: noti.afectaSaldo,
      monto: noti.monto || 0,
      familia: noti.familia,
      impacto: noti.impacto,
      titulo: noti.titulo || '',
      detalle: noti.detalle || '',
      esGrupo: !!noti.esGrupo
    }));
    console.log('Notificacion enviada:', noti.nombreApp);
  }
}

// --- FUNCIONES QUE SE LLAMAN DESDE LOS MENSAJES ---
function desbloquearDesdeWebSocket() {
  // Si ya está corriendo, no arrancar dos veces
  if (typeof chaosStarted !== 'undefined' && chaosStarted) return;
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
  chaosStarted = false;
  detenerPartitura();
  notificacionesUsadas = [];

  activeNotifications.forEach(function(notifObj) {
    clearTimeout(notifObj.timeout);
    forceRemove(notifObj.element);
  });
  activeNotifications = [];

  pantalla2.classList.remove('disp');
  pantalla2.classList.add('no-disp');
  pantalla1.classList.remove('no-disp');
  pantalla1.classList.add('disp');

  Object.keys(badges).forEach(function(fam) {
    contadores[fam] = 0;
    if (badges[fam]) badges[fam].style.display = 'none';
  });

  notificationContainer.innerHTML = '';
}

function resetearDesdeWebSocket() {
  detenerDesdeWebSocket();
}

// --- INICIAR CONEXIÓN ---
conectarWebSocket();
