// =============================================================
// VARIABLES GLOBALES
// =============================================================

let pantalla1 = document.getElementById('pantalla-1');
let pantalla2 = document.getElementById('pantalla-2');
let notificationContainer = document.getElementById('notification-container');

// badges
let whatsappBadge = document.getElementById('whatsappBadge');
let bancoBadge = document.getElementById('bancoBadge');
let gmailBadge = document.getElementById('gmailBadge');
let calendarioBadge = document.getElementById('calendarioBadge');
let whatsappCount = 0;
let bancoCount = 0;
let gmailCount = 0;
let calendarioCount = 0;

// sonido de notificación
let sonidoNoti = new Audio('assets/sounds/sonido-noti-simple.mp3');

function playSonidoNoti() {
  // cortar el sonido anterior si todavía suena
  sonidoNoti.pause();
  sonidoNoti.currentTime = 0;
  sonidoNoti.play();
}
let activeNotifications = [];
let isInPeaceMode = false;
let maxVisibleNotis = 6;  // máximo en pantalla a la vez
let chaosStarted = false;

// =============================================================
// RELOJ Y FECHA
// =============================================================

function actualizarReloj() {
  let ahora = new Date();
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();
  if (minutos < 10) minutos = '0' + minutos;
  let horaFormateada = horas + ':' + minutos;

  // actualizar todos los elementos con clase hora-lock
  let horasDom = document.getElementsByClassName('hora-lock');
  for (let i = 0; i < horasDom.length; i++) {
    horasDom[i].innerText = horaFormateada;
  }

  // hora en el home screen
  let homeTime = document.getElementById('home-time');
  if (homeTime) homeTime.innerText = horaFormateada;

  // fecha del lockscreen
  let diaSemana = ahora.getDay();
  let diaMes = ahora.getDate();
  let mes = ahora.getMonth();
  let dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  let fechaTexto = dias[diaSemana] + ' ' + diaMes + ' de ' + meses[mes];

  let fechaLock = document.getElementById('fecha-lock');
  if (fechaLock) fechaLock.innerText = fechaTexto;
}

actualizarReloj();
setInterval(actualizarReloj, 60 * 1000);

// =============================================================
// BADGES
// =============================================================

function animateBadge(badge) {
  badge.style.animation = 'none';
  setTimeout(function() {
    badge.style.animation = 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  }, 10);
}

function updateWhatsAppBadge() {
  whatsappCount++;
  whatsappBadge.textContent = whatsappCount > 99 ? '99+' : whatsappCount;
  whatsappBadge.style.display = 'flex';
  animateBadge(whatsappBadge);
}

function updateBancoBadge() {
  bancoCount++;
  bancoBadge.textContent = bancoCount > 99 ? '99+' : bancoCount;
  bancoBadge.style.display = 'flex';
  animateBadge(bancoBadge);
}

function updateGmailBadge() {
  gmailCount++;
  gmailBadge.textContent = gmailCount > 99 ? '99+' : gmailCount;
  gmailBadge.style.display = 'flex';
  animateBadge(gmailBadge);
}

function updateCalendarioBadge() {
  calendarioCount++;
  calendarioBadge.textContent = calendarioCount > 99 ? '99+' : calendarioCount;
  calendarioBadge.style.display = 'flex';
  animateBadge(calendarioBadge);
}

// =============================================================
// SELECCIÓN ALEATORIA CON PESOS
// =============================================================

function getRandomNotification() {
  let pool = datosNotificaciones.pool;
  let pesos = datosNotificaciones.pesos;

  // construir array ponderado
  let weighted = [];
  for (let i = 0; i < pool.length; i++) {
    let noti = pool[i];
    let peso = pesos[noti.categoria] || 1;
    for (let j = 0; j < peso; j++) {
      weighted.push(noti);
    }
  }

  return weighted[Math.floor(Math.random() * weighted.length)];
}

// =============================================================
// CREAR NOTIFICACIÓN VISUAL
// =============================================================

function crearNotificacion(noti) {
  // contenedor
  let contenedorNotificacion = document.createElement('div');
  contenedorNotificacion.classList.add('notificacion');

  // si es gasto, marcar visual
  if (noti.afectaSaldo) {
    contenedorNotificacion.classList.add('es-gasto');
  }

  // icono
  let iconoNoti = document.createElement('div');
  iconoNoti.classList.add('icono-noti');
  let iconoImg = document.createElement('img');
  iconoImg.src = noti.icono;
  iconoImg.alt = noti.nombreApp;
  iconoNoti.appendChild(iconoImg);
  contenedorNotificacion.appendChild(iconoNoti);

  // textos
  let textosNoti = document.createElement('div');
  textosNoti.classList.add('textos-noti');

  // título + hora
  let appNombre = document.createElement('h1');
  appNombre.classList.add('titulo-noti');
  appNombre.innerText = noti.nombreApp;

  let spanHora = document.createElement('span');
  spanHora.classList.add('hora-noti');
  let ahora = new Date();
  let h = ahora.getHours();
  let m = ahora.getMinutes();
  if (m < 10) m = '0' + m;
  spanHora.innerText = h + ':' + m;
  appNombre.appendChild(spanHora);

  textosNoti.appendChild(appNombre);

  // texto del mensaje
  let textoNoti = document.createElement('p');
  textoNoti.classList.add('contenido-noti');
  textoNoti.innerText = noti.mensaje;
  textosNoti.appendChild(textoNoti);

  contenedorNotificacion.appendChild(textosNoti);

  // insertar al principio del contenedor (las nuevas arriba)
  if (notificationContainer.firstChild) {
    notificationContainer.insertBefore(contenedorNotificacion, notificationContainer.firstChild);
  } else {
    notificationContainer.appendChild(contenedorNotificacion);
  }

  // animación de entrada
  setTimeout(function() {
    contenedorNotificacion.classList.add('mostrar');
  }, 10);

  // sonido
  playSonidoNoti();

  // efectos secundarios: actualizar badges según categoría
  if (noti.icono.includes('wtsap')) {
    updateWhatsAppBadge();
  }
  if (noti.categoria === 'dinero' || noti.categoria === 'servicios') {
    updateBancoBadge();
  }
  if (noti.categoria === 'trabajo') {
    updateGmailBadge();
  }
  if (noti.categoria === 'cuidado' || noti.categoria === 'salud') {
    updateCalendarioBadge();
  }

  // programar desaparición (entre 5 y 10 segundos — tiempo para leer)
  let lifespan = Math.random() * 5000 + 5000;

  let notifObj = {
    element: contenedorNotificacion,
    noti: noti,
    timeout: setTimeout(function() {
      removeNotification(notifObj);
    }, lifespan)
  };

  activeNotifications.push(notifObj);

  // si hay demasiadas, sacar la más vieja
  while (activeNotifications.length > maxVisibleNotis) {
    let oldest = activeNotifications.shift();
    clearTimeout(oldest.timeout);
    forceRemove(oldest.element);
  }
}

function removeNotification(notifObj) {
  let index = activeNotifications.indexOf(notifObj);
  if (index > -1) {
    activeNotifications.splice(index, 1);
    notifObj.element.classList.add('ocultar');
    notifObj.element.classList.remove('mostrar');
    setTimeout(function() {
      if (notifObj.element.parentNode) {
        notifObj.element.parentNode.removeChild(notifObj.element);
      }
    }, 300);
  }
}

function forceRemove(element) {
  element.classList.add('ocultar');
  element.classList.remove('mostrar');
  setTimeout(function() {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }, 300);
}

// =============================================================
// MOTOR DE CAOS
// Similar al index de referencia:
// ráfagas de 1-3 notificaciones, micro-respiros, modo paz
// =============================================================

function scheduleChaos() {
  if (!chaosStarted) return;

  if (isInPeaceMode) {
    // micro-respiro: 2 a 4 segundos sin notificaciones
    let peaceDuration = Math.random() * 2000 + 2000;
    setTimeout(function() {
      isInPeaceMode = false;
      scheduleChaos();
    }, peaceDuration);
    return;
  }

  // ráfaga: 1 a 2 notificaciones (menos agresivo)
  let burstSize = Math.floor(Math.random() * 2) + 1;

  for (let i = 0; i < burstSize; i++) {
    setTimeout(function() {
      let noti = getRandomNotification();
      crearNotificacion(noti);
    }, i * 400); // 400ms entre cada una de la ráfaga
  }

  // decidir siguiente acción
  let nextDelay = Math.random() * 2500 + 1500; // 1.5s - 4s

  setTimeout(function() {
    // 30% de probabilidad de entrar en modo paz
    if (Math.random() < 0.30) {
      isInPeaceMode = true;
    }
    scheduleChaos();
  }, nextDelay + (burstSize * 400));
}

// =============================================================
// DESBLOQUEO: tap en pantalla 1 → pantalla 2
// =============================================================

pantalla1.addEventListener('click', function() {
  // animación de desbloqueo
  pantalla1.classList.add('desbloqueando');

  setTimeout(function() {
    // ocultar lockscreen
    pantalla1.classList.remove('disp', 'desbloqueando');
    pantalla1.classList.add('no-disp');

    // mostrar home screen
    pantalla2.classList.remove('no-disp');
    pantalla2.classList.add('disp');

    // arrancar el caos después de 1 segundo
    setTimeout(function() {
      chaosStarted = true;
      scheduleChaos();
    }, 1000);
  }, 400);
});
