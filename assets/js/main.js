// variables globales
// pantallas
let pantalla1 = document.getElementById('pantalla-1');
let pantalla2 = document.getElementById('pantalla-2');
let contenedorGral = document.getElementById('contenedor-gral');
// contenedor donde van las notificaciones (dentro de pantalla-2)
let contenidoPantalla2 = document.getElementById('contenido-pantalla-2');

// al hacer click en la pantalla negra, paso a la pantalla de notificaciones
pantalla1.addEventListener('click', inicio);

// función de inicio
function inicio() {
  pantalla1.classList.remove('disp');
  pantalla1.classList.add('no-disp');
  pantalla2.classList.remove('no-disp');
  pantalla2.classList.add('disp');
}

// función para actualizar la hora y la fecha del lockscreen
function actualizarReloj() {
  let ahora = new Date();

  // hora
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();

  if (minutos < 10) {
    minutos = '0' + minutos;
  }

  let horaFormateada = horas + ':' + minutos;

  // fecha
  let diaSemana = ahora.getDay();
  let diaMes = ahora.getDate();
  let mes = ahora.getMonth();

  // armo arrays con los nombres porque los métodos devuelven números
  let dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  let meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  let nombreDia = dias[diaSemana];
  let nombreMes = meses[mes];
  let fechaTexto = nombreDia + ' ' + diaMes + ' de ' + nombreMes;

  // escribir en el HTML

  // todos los elementos que muestran la hora (lockscreen + noti si quisieras)
  let horasDom = document.getElementsByClassName('hora-lock');

  for (let i = 0; i < horasDom.length; i++) {
    horasDom[i].innerText = horaFormateada;
  }

  // la fecha solo va en el h3
  let fechaLock = document.getElementById('fecha-lock');
  if (fechaLock) {
    fechaLock.innerText = fechaTexto;
  }
}

// la llamo al cargar
actualizarReloj();

// actualizo cada minuto
setInterval(actualizarReloj, 60 * 1000);

// ------------------------------------------------------
// función para crear una notificación nueva
// icono: ruta a la imagen (string)
// nombreApp: "WhatsApp", "Banco", etc.
// hora: texto de la hora que querés mostrar ("14:30", "Ahora", etc.)
// texto: contenido de la notificación
// ------------------------------------------------------
function notificacion(icono, nombreApp, hora, texto) {
  // contenedor de la notificación
  let contenedorNotificacion = document.createElement('div');
  contenedorNotificacion.classList.add('notificacion');

  // la agrego dentro de pantalla-2, debajo de la hora
  contenidoPantalla2.appendChild(contenedorNotificacion);

  // ---- columna del icono ----
  let iconoNoti = document.createElement('div');
  iconoNoti.classList.add('icono-noti');
  contenedorNotificacion.appendChild(iconoNoti);

  let iconoImg = document.createElement('img');
  iconoImg.src = icono;
  iconoImg.alt = nombreApp;
  iconoNoti.appendChild(iconoImg);

  // ---- columna de textos ----
  let textosNoti = document.createElement('div');
  textosNoti.classList.add('textos-noti');
  contenedorNotificacion.appendChild(textosNoti);

  // título de la app + hora
  let appNombre = document.createElement('h1');
  appNombre.classList.add('titulo-noti');
  appNombre.innerText = nombreApp;

  let spanHora = document.createElement('span');
  spanHora.classList.add('hora-lock', 'hora-noti'); // mismo estilo + si querés usar actualizarReloj
  spanHora.innerText = hora;

  appNombre.appendChild(spanHora);
  textosNoti.appendChild(appNombre);

  // texto de la notificación
  let textoNoti = document.createElement('p');
  textoNoti.classList.add('contenido-noti');
  textoNoti.innerText = texto;
  textosNoti.appendChild(textoNoti);
}

// EJEMPLO DE USO (para probar):
notificacion('assets/imgs/icono-wtsap.png', 'WhatsApp', '14:30', 'El niño se siente mal, necesitamos que lo retire.');
