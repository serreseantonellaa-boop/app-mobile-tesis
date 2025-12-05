// variables globales

//capturo las dos “pantallas” principales
let pantalla1 = document.getElementById('pantalla-1');   // pantalla negra de inicio (bloqueo)
let pantalla2 = document.getElementById('pantalla-2');   // pantalla con fondo + hora + notis

//contenedor general (por si después lo necesito para algo más)
let contenedorGral = document.getElementById('contenedor-gral');

// ste es el contenedor donde van la hora, la fecha y las notificaciones
let contenidoPantalla2 = document.getElementById('contenido-pantalla-2');

//cuando hago click en la pantalla negra, arranca la “sesión” de notificaciones
pantalla1.addEventListener('click', inicio);

//función de inicio
function inicio() {
  //saco la pantalla 1 (negra)
  pantalla1.classList.remove('disp');
  pantalla1.classList.add('no-disp');

  //muestro la pantalla 2 (lockscreen con fondo + notis)
  pantalla2.classList.remove('no-disp');
  pantalla2.classList.add('disp');
}

//función para actualizar hora y fecha del lockscreen
function actualizarReloj() {
  //obtengo la fecha y hora actual del sistema
  let ahora = new Date();

  //hora
  let horas = ahora.getHours(); // de 0 a 23
  let minutos = ahora.getMinutes();  // de 0 a 59

  //si los minutos son menores que 10, le agrego un 0 adelante para que quede tipo 14:05
  if (minutos < 10) {
    minutos = '0' + minutos;
  }

  //armo el texto final de la hora
  let horaFormateada = horas + ':' + minutos;

  //fecha 
  let diaSemana = ahora.getDay();   // 0 domingo, 1 lunes, etc.
  let diaMes = ahora.getDate();     // día numérico
  let mes = ahora.getMonth();       // 0 enero, 1 febrero, etc.

  //arrays con los nombres reales porque los métodos me devuelven números
  let dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  let meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  let nombreDia = dias[diaSemana];
  let nombreMes = meses[mes];

  //ejemplo: "martes 9 de diciembre"
  let fechaTexto = nombreDia + ' ' + diaMes + ' de ' + nombreMes;

  //escribo la info en el HTML
  //todos los elementos que muestran la hora (la grande + las horas de las notis)
  //todos comparten la clase "hora-lock"
  let horasDom = document.getElementsByClassName('hora-lock');

  //recorro la colección y les pongo la misma hora a todos
  for (let i = 0; i < horasDom.length; i++) {
    horasDom[i].innerText = horaFormateada;
  }

  //la fecha solo se muestra en el h3 con id "fecha-lock"
  let fechaLock = document.getElementById('fecha-lock');
  if (fechaLock) {
    fechaLock.innerText = fechaTexto;
  }
}

//llamo una vez la función apenas carga el script
actualizarReloj();

// y después la vuelvo a llamar cada minuto para que no se quede clavada
setInterval(actualizarReloj, 60 * 1000);

//función para crear una notificación
//icono: ruta de la imagen del icono (string)
//nombreApp: nombre de la app que manda la noti ("WhatsApp", "Banco", etc.)
//texto: contenido de la notificación
//la hora NO la paso como parámetro, la toma de actualizarReloj()


function notificacion(icono, nombreApp, texto) {
  //contenedor principal de la notificación
  let contenedorNotificacion = document.createElement('div');
  contenedorNotificacion.classList.add('notificacion');

  //agrego la notificación dentro de la pantalla 2, debajo de la hora/fecha
  contenidoPantalla2.appendChild(contenedorNotificacion);

  //columna del icono
  let iconoNoti = document.createElement('div');
  iconoNoti.classList.add('icono-noti');
  contenedorNotificacion.appendChild(iconoNoti);

  let iconoImg = document.createElement('img');
  iconoImg.src = icono;       // ruta que me llega por parámetro
  iconoImg.alt = nombreApp;   // por accesibilidad/semántica básica
  iconoNoti.appendChild(iconoImg);

  //columna de textos
  let textosNoti = document.createElement('div');
  textosNoti.classList.add('textos-noti');
  contenedorNotificacion.appendChild(textosNoti);

  // título de la app
  let appNombre = document.createElement('h1');
  appNombre.classList.add('titulo-noti');
  appNombre.innerText = nombreApp;   // texto principal de la app

  // span para la hora de la noti
  let spanHora = document.createElement('span');
  // uso la misma clase "hora-lock" que la hora grande para que actualizarReloj() también la toque
  spanHora.classList.add('hora-lock', 'hora-noti');

  // no le pongo texto acá a propósito actualizarReloj() rellena todas las horas juntas

  // meto el span de la hora al lado del nombre de la app
  appNombre.appendChild(spanHora);

  // agrego el título completo (app + hora) al bloque de textos
  textosNoti.appendChild(appNombre);

  // texto principal del cuerpo de la notificación
  let textoNoti = document.createElement('p');
  textoNoti.classList.add('contenido-noti');
  textoNoti.innerText = texto;
  textosNoti.appendChild(textoNoti);

  // como acabo de agregar un nuevo span con clase "hora-lock",
  // vuelvo a llamar a actualizarReloj() para que le cargue la hora actual también ahí
  actualizarReloj();
}

// ejemplo de prueba manual
notificacion('assets/imgs/icono-wtsap.png', 'WhatsApp', 'El niño se siente mal, necesitamos que lo retire.');
