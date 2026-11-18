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
// El servidor corre en la notebook, en el puerto 8080.
// El celular abre esta app desde la propia notebook (npx serve, puerto 3000),
// así que la dirección de la página ES la de la notebook: se usa esa misma.
// Funciona en cualquier red sin tocar nada.
//
// Si la página se abre desde otro lado (Vercel, o un archivo suelto),
// se usa la red propia de la notebook (Zona con cobertura inalámbrica
// móvil de Windows), que siempre tiene la dirección 192.168.137.1.
let IP_RED_PROPIA = '192.168.137.1';
let hostPagina = window.location.hostname;
let esLocal = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostPagina) || hostPagina === 'localhost';
let WS_URL = 'ws://' + (esLocal ? hostPagina : IP_RED_PROPIA) + ':8080';

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

    // --- LLAMADA: la notebook hace sonar una llamada en el celular ---
    if (datos.tipo === 'llamada') {
      if (datos.estado === 'entrante') mostrarLlamadaEntrante(datos);
      if (datos.estado === 'terminar') ocultarLlamadaEntrante();
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

// --- AVISAR QUE SE CORTÓ LA LLAMADA ---
function enviarLlamadaCortada(quien) {
  if (conectado && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ tipo: 'llamada', estado: 'cortada', quien: quien }));
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
  if (typeof ocultarLlamadaEntrante === 'function') ocultarLlamadaEntrante();
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
