// =============================================================
// VARIABLES GLOBALES
// =============================================================

let pantalla1 = document.getElementById('pantalla-1');
let pantalla2 = document.getElementById('pantalla-2');
let notificationContainer = document.getElementById('notification-container');

// badges: uno por app del dock
let badges = {};
let contadores = {};
['whatsapp', 'gmail', 'banco', 'obrasocial', 'calendario'].forEach(function(fam) {
  badges[fam] = document.getElementById('badge-' + fam);
  contadores[fam] = 0;
});

// sonido de notificación
let sonidoNoti = new Audio('assets/sounds/sonido-noti-simple.mp3');

function playSonidoNoti() {
  sonidoNoti.pause();
  sonidoNoti.currentTime = 0;
  sonidoNoti.play();
}

let activeNotifications = [];
let maxVisibleNotis = 6;
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

  let horasDom = document.getElementsByClassName('hora-lock');
  for (let i = 0; i < horasDom.length; i++) {
    horasDom[i].innerText = horaFormateada;
  }

  let homeTime = document.getElementById('home-time');
  if (homeTime) homeTime.innerText = horaFormateada;

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

function sumarBadge(familia) {
  let badge = badges[familia];
  if (!badge) return;
  contadores[familia]++;
  badge.textContent = contadores[familia] > 99 ? '99+' : contadores[familia];
  badge.style.display = 'flex';
  animateBadge(badge);
}

// =============================================================
// SELECCIÓN ALEATORIA CON PESOS (SIN REPETIR)
// =============================================================

let notificacionesUsadas = [];

function getRandomNotification() {
  let pool = datosNotificaciones.pool;
  let pesos = datosNotificaciones.pesos;

  // Las de impacto alto tienen su momento fijo en la partitura
  let fijas = datosNotificaciones.partitura.fijas.map(function(f) { return f.id; });
  let sorteables = pool.filter(function(noti) {
    return fijas.indexOf(noti.id) === -1;
  });

  // Filtrar las que ya salieron
  let disponibles = sorteables.filter(function(noti) {
    return notificacionesUsadas.indexOf(noti.id) === -1;
  });

  // Si se agotaron todas, reiniciar
  if (disponibles.length === 0) {
    notificacionesUsadas = [];
    disponibles = sorteables;
  }

  // Construir array ponderado con las disponibles
  let weighted = [];
  for (let i = 0; i < disponibles.length; i++) {
    let noti = disponibles[i];
    let peso = pesos[noti.categoria] || 1;
    for (let j = 0; j < peso; j++) {
      weighted.push(noti);
    }
  }

  let elegida = weighted[Math.floor(Math.random() * weighted.length)];
  notificacionesUsadas.push(elegida.id);
  return elegida;
}

// =============================================================
// CREAR NOTIFICACIÓN VISUAL
// =============================================================

// Cada notificación toma el aspecto de su app de origen
let nombreFamilia = {
  whatsapp: 'WhatsApp',
  banco: 'Galicia',
  gmail: 'Gmail',
  calendario: 'Calendario',
  obrasocial: 'SaludPlus'
};

let coloresAvatar = ['#6a4c93', '#3b5f7a', '#8a4b2d', '#2e7d6b', '#7a3b5f', '#4a5a8a'];

function colorAvatar(nombre) {
  let suma = 0;
  for (let i = 0; i < nombre.length; i++) suma += nombre.charCodeAt(i);
  return coloresAvatar[suma % coloresAvatar.length];
}

function crearEl(tag, clase, texto) {
  let el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

function crearNotificacion(noti) {
  let familia = noti.familia || 'whatsapp';

  let contenedorNotificacion = crearEl('div', 'notificacion f-' + familia);

  // Encabezado: ícono chico + nombre de la app + "ahora"
  let head = crearEl('div', 'n-head');
  let mini = crearEl('img', 'n-mini');
  mini.src = noti.icono;
  mini.alt = '';
  head.appendChild(mini);
  head.appendChild(crearEl('span', 'n-app', nombreFamilia[familia]));
  head.appendChild(crearEl('span', 'n-hora', '· ahora'));
  contenedorNotificacion.appendChild(head);

  if (familia === 'whatsapp') {
    let cuerpo = crearEl('div', 'n-cuerpo');
    let avatar = crearEl('div', 'n-avatar');
    avatar.style.background = colorAvatar(noti.nombreApp);
    if (noti.esGrupo) {
      avatar.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="9" cy="9" r="3.2" fill="#fff"/><circle cx="16.5" cy="10" r="2.6" fill="#fff" opacity=".75"/><path d="M3 19c.5-3.5 3-5 6-5s5.5 1.5 6 5z" fill="#fff"/><path d="M14.5 14.3c2.5 0 4.6 1.3 5.1 4.7H16" fill="#fff" opacity=".75"/></svg>';
    } else {
      avatar.textContent = noti.nombreApp.charAt(0).toUpperCase();
    }
    cuerpo.appendChild(avatar);
    let textos = crearEl('div', 'n-textos');
    textos.appendChild(crearEl('div', 'n-tit', noti.nombreApp));
    textos.appendChild(crearEl('div', 'n-msg', noti.mensaje));
    cuerpo.appendChild(textos);
    contenedorNotificacion.appendChild(cuerpo);
    let acc = crearEl('div', 'n-acc');
    acc.appendChild(crearEl('span', '', 'Responder'));
    acc.appendChild(crearEl('span', '', 'Marcar como leído'));
    contenedorNotificacion.appendChild(acc);

  } else if (familia === 'banco') {
    contenedorNotificacion.appendChild(crearEl('div', 'n-tit', noti.titulo || noti.nombreApp));
    if (noti.afectaSaldo && noti.monto > 0) {
      contenedorNotificacion.appendChild(crearEl('div', 'n-monto', '-$' + noti.monto.toLocaleString('es-AR')));
    }
    contenedorNotificacion.appendChild(crearEl('div', 'n-msg', noti.detalle || noti.mensaje));

  } else if (familia === 'obrasocial') {
    // "Autorización rechazada: el estudio..." -> título + texto
    let partes = noti.mensaje.split(': ');
    if (partes.length > 1) {
      let resto = partes.slice(1).join(': ');
      contenedorNotificacion.appendChild(crearEl('div', 'n-tit', partes[0]));
      contenedorNotificacion.appendChild(crearEl('div', 'n-msg', resto.charAt(0).toUpperCase() + resto.slice(1)));
    } else {
      contenedorNotificacion.appendChild(crearEl('div', 'n-tit', noti.nombreApp));
      contenedorNotificacion.appendChild(crearEl('div', 'n-msg', noti.mensaje));
    }

  } else {
    // gmail y calendario
    contenedorNotificacion.appendChild(crearEl('div', 'n-tit', noti.nombreApp));
    contenedorNotificacion.appendChild(crearEl('div', 'n-msg', noti.mensaje));
    let acc = crearEl('div', 'n-acc');
    if (familia === 'calendario') {
      acc.appendChild(crearEl('span', '', 'Posponer'));
      acc.appendChild(crearEl('span', '', 'Descartar'));
    } else {
      acc.appendChild(crearEl('span', '', 'Archivar'));
      acc.appendChild(crearEl('span', '', 'Responder'));
    }
    contenedorNotificacion.appendChild(acc);
  }

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

  // *** ENVIAR TODAS LAS NOTIFICACIONES A LA NOTEBOOK ***
  // Esto hace que aparezcan como popups estilo Windows 11 en la pantalla de presupuesto
  enviarNotificacion(noti);

  // Si es una notificación de gasto, TAMBIÉN avisar para descontar del presupuesto
  if (noti.afectaSaldo) {
    enviarGasto(noti);
  }

  // sumar al contador del ícono de su app
  sumarBadge(familia);

  // programar desaparición: todas duran lo mismo
  let lifespan = datosNotificaciones.partitura.vidaNotificacion * 1000;

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
// PARTITURA: cuándo aparece cada notificación
// Reemplaza al azar total. Arma la lista de momentos al arrancar
// y la va disparando. Se corta si la notebook manda "stop".
// =============================================================

let timeoutsPartitura = [];

function armarPartitura() {
  let p = datosNotificaciones.partitura;
  let eventos = [];

  // Tramos con ritmo creciente
  p.tramos.forEach(function(tramo) {
    let t = tramo.desde;
    while (t < tramo.hasta) {
      eventos.push({ segundo: t });
      t += tramo.cadaMin + Math.random() * (tramo.cadaMax - tramo.cadaMin);
    }
  });

  // Ráfagas
  p.rafagas.forEach(function(r) {
    for (let i = 0; i < r.cantidad; i++) {
      eventos.push({ segundo: r.segundo + i * 0.4 });
    }
  });

  // Fijas: sacan del medio a cualquier otra que caiga muy cerca
  p.fijas.forEach(function(f) {
    eventos = eventos.filter(function(e) {
      return Math.abs(e.segundo - f.segundo) > 0.8;
    });
    eventos.push({ segundo: f.segundo, id: f.id });
  });

  eventos = eventos.filter(function(e) { return e.segundo <= p.duracionTotal; });
  eventos.sort(function(a, b) { return a.segundo - b.segundo; });
  return eventos;
}

function scheduleChaos() {
  if (!chaosStarted) return;
  detenerPartitura();

  armarPartitura().forEach(function(evento) {
    let id = setTimeout(function() {
      if (!chaosStarted) return;
      let noti;
      if (evento.id) {
        noti = datosNotificaciones.pool.find(function(n) { return n.id === evento.id; });
      }
      if (!noti) noti = getRandomNotification();
      crearNotificacion(noti);
    }, evento.segundo * 1000);
    timeoutsPartitura.push(id);
  });
}

function detenerPartitura() {
  timeoutsPartitura.forEach(function(id) { clearTimeout(id); });
  timeoutsPartitura = [];
}

// =============================================================
// TOQUE EN LA PANTALLA BLOQUEADA
// =============================================================
// Los navegadores no dejan reproducir sonido hasta que la persona
// toca la pantalla una vez. Este toque SOLO HABILITA EL SONIDO.
// Nunca arranca las notificaciones: arrancan únicamente cuando la
// notebook manda "start" (al tocar "Comenzar" en la app de presupuesto).

let sonidoHabilitado = false;

function habilitarSonido() {
  if (sonidoHabilitado) return;
  sonidoNoti.muted = true;
  let intento = sonidoNoti.play();
  if (intento && intento.then) {
    intento.then(function() {
      sonidoNoti.pause();
      sonidoNoti.currentTime = 0;
      sonidoNoti.muted = false;
      sonidoHabilitado = true;
    }).catch(function() {
      sonidoNoti.muted = false;
    });
  } else {
    sonidoNoti.muted = false;
    sonidoHabilitado = true;
  }
}

pantalla1.addEventListener('click', function() {
  habilitarSonido();
});


// =============================================================
// LLAMADA ENTRANTE (cobranza)
// La notebook avisa cuándo entra. Suena y vibra en loop hasta
// que la persona cuelga; entonces se le avisa a la notebook,
// que mientras tanto tiene la planilla bloqueada.
// =============================================================

let llamadaEntranteEl = document.getElementById('llamada-entrante');
let llamadaActual = null;          // { quien, audio, vibracion }

function mostrarLlamadaEntrante(datos) {
  if (llamadaActual) return;
  document.getElementById('le-nombre').textContent = datos.nombre || 'Estudio de Cobranzas';
  document.getElementById('le-sub').textContent = datos.sub || 'Número desconocido';
  llamadaEntranteEl.classList.remove('no-disp');
  llamadaEntranteEl.classList.add('disp');

  let audio = null;
  if (datos.sonido) {
    audio = new Audio(datos.sonido);
    audio.loop = true;
    audio.play().catch(function() {});
  }

  // Vibración, donde el navegador lo permita (Chrome en Android)
  let vibracion = null;
  if (navigator.vibrate) {
    navigator.vibrate([900, 600]);
    vibracion = setInterval(function() { navigator.vibrate([900, 600]); }, 1500);
  }

  llamadaActual = { quien: datos.quien, audio: audio, vibracion: vibracion };
}

function ocultarLlamadaEntrante() {
  if (!llamadaActual) return;
  if (llamadaActual.audio) {
    llamadaActual.audio.pause();
    llamadaActual.audio.currentTime = 0;
  }
  if (llamadaActual.vibracion) clearInterval(llamadaActual.vibracion);
  if (navigator.vibrate) navigator.vibrate(0);
  llamadaEntranteEl.classList.remove('disp');
  llamadaEntranteEl.classList.add('no-disp');
  llamadaActual = null;
}

document.getElementById('btn-colgar').addEventListener('click', function() {
  if (!llamadaActual) return;
  let quien = llamadaActual.quien;
  ocultarLlamadaEntrante();
  enviarLlamadaCortada(quien);
});
