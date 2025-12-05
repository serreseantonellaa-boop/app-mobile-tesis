// variables globales
// capturo las dos “pantallas” principales
let pantalla1 = document.getElementById('pantalla-1');   // pantalla negra de inicio (bloqueo)
let pantalla2 = document.getElementById('pantalla-2');   // pantalla con fondo + hora + notis

// contenedor general (por si después lo necesito para algo más)
let contenedorGral = document.getElementById('contenedor-gral');

// este es el contenedor donde van la hora, la fecha y las notificaciones
let contenidoPantalla2 = document.getElementById('contenido-pantalla-2');

// cuando hago click en la pantalla negra, arranca la “sesión” de notificaciones
pantalla1.addEventListener('click', inicio);

// función de inicio
function inicio() {
  // saco la pantalla 1 (negra)
  pantalla1.classList.remove('disp');
  pantalla1.classList.add('no-disp');

  // muestro la pantalla 2 (lockscreen con fondo + notis)
  pantalla2.classList.remove('no-disp');
  pantalla2.classList.add('disp');

  // disparo la primera ráfaga: una notificación nueva cada 10 segundos
  // (por ahora solo probamos rafaga1)
  dispararRafaga(datosNotificaciones.rafaga1, 10000);
}

// función para actualizar hora y fecha del lockscreen
function actualizarReloj() {
  // obtengo la fecha y hora actual del sistema
  let ahora = new Date();

  // hora
  let horas = ahora.getHours();      // de 0 a 23
  let minutos = ahora.getMinutes();  // de 0 a 59

  // si los minutos son menores que 10, le agrego un 0 adelante para que quede tipo 14:05
  if (minutos < 10) {
    minutos = '0' + minutos;
  }

  // armo el texto final de la hora
  let horaFormateada = horas + ':' + minutos;

  // fecha
  let diaSemana = ahora.getDay();   // 0 domingo, 1 lunes, etc.
  let diaMes = ahora.getDate();     // día numérico
  let mes = ahora.getMonth();       // 0 enero, 1 febrero, etc.

  // arrays con los nombres reales porque los métodos me devuelven números
  let dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  let meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  let nombreDia = dias[diaSemana];
  let nombreMes = meses[mes];

  // ejemplo: "martes 9 de diciembre"
  let fechaTexto = nombreDia + ' ' + diaMes + ' de ' + nombreMes;

  // escribo la info en el HTML
  // solo la hora grande del lockscreen usa la clase "hora-lock"
  // (las notificaciones YA NO tienen esta clase para que su hora quede congelada)
  let horasDom = document.getElementsByClassName('hora-lock');

  // recorro la colección y les pongo la misma hora a todos los que tengan esa clase
  // en la práctica debería ser solo el h1 de la hora grande
  for (let i = 0; i < horasDom.length; i++) {
    horasDom[i].innerText = horaFormateada;
  }

  // la fecha solo se muestra en el h3 con id "fecha-lock"
  let fechaLock = document.getElementById('fecha-lock');
  if (fechaLock) {
    fechaLock.innerText = fechaTexto;
  }
}

// llamo una vez la función apenas carga el script
actualizarReloj();

// y después la vuelvo a llamar cada minuto para que no se quede clavada
setInterval(actualizarReloj, 60 * 1000);

// función para crear una notificación
// icono: ruta de la imagen del icono
// nombreApp: nombre de la app ("WhatsApp", "Banco Aurora", etc.)
// texto: contenido de la notificación
//la hora de la notificación se congela cuando aparece,
// así que acá calculo la hora una sola vez y la dejo fija.
function notificacion(icono, nombreApp, texto) {
  // contenedor principal de la notificación
  let contenedorNotificacion = document.createElement('div');
  contenedorNotificacion.classList.add('notificacion');

  // agrego la notificación dentro de la pantalla 2, debajo de la hora/fecha
  contenidoPantalla2.appendChild(contenedorNotificacion);

  // columna del icono 
  let iconoNoti = document.createElement('div');
  iconoNoti.classList.add('icono-noti');
  contenedorNotificacion.appendChild(iconoNoti);

  let iconoImg = document.createElement('img');
  iconoImg.src = icono; // ruta que me llega por parámetro
  iconoImg.alt = nombreApp;
  iconoNoti.appendChild(iconoImg);

  // columna de textos
  let textosNoti = document.createElement('div');
  textosNoti.classList.add('textos-noti');
  contenedorNotificacion.appendChild(textosNoti);

  // título de la app
  let appNombre = document.createElement('h1');
  appNombre.classList.add('titulo-noti');
  appNombre.innerText = nombreApp;

  // span para la hora de la noti
  let spanHora = document.createElement('span');
  // acá solo uso "hora-noti"
  // ya NO le pongo "hora-lock" porque esa clase la usa actualizarReloj()
  // y no quiero que me siga tocando la hora de la notificación.
  spanHora.classList.add('hora-noti');

  //calculo la hora actual solo para esta notificación
  let ahora = new Date();
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();

  if (minutos < 10) {
    minutos = '0' + minutos;
  }

  let horaNoti = horas + ':' + minutos;

  //escribo la hora una vez y queda congelada
  spanHora.innerText = horaNoti;

  //meto el span de la hora al lado del nombre de la app
  appNombre.appendChild(spanHora);

  //agrego el título completo (app + hora) al bloque de textos
  textosNoti.appendChild(appNombre);

  //texto principal del cuerpo de la notificación
  let textoNoti = document.createElement('p');
  textoNoti.classList.add('contenido-noti');
  textoNoti.innerText = texto;
  textosNoti.appendChild(textoNoti);

  //animación de entrada
  //pequeña espera para que se ponga la noti y después le agrego la clase "mostrar"
  setTimeout(function() {
    contenedorNotificacion.classList.add('mostrar');
  }, 10);

  //acá no la borro ni la oculto: se queda en la pantalla
}

// función para disparar una ráfaga de notificaciones
// rafaga: array de datos (ej: datosNotificaciones.rafaga1)
// intervaloMs: cada cuántos ms aparece una nueva notificación
function dispararRafaga(rafaga, intervaloMs) {
  let indice = 0;

  function siguiente() {
    //si ya mostré todas las notificaciones de la ráfaga, no hago más nada
    if (indice >= rafaga.length) {
      return;
    }

    let noti = rafaga[indice];

    //creo la notificación visual usando los datos del objeto
    notificacion(
      noti.icono,
      noti.nombreApp,
      noti.mensaje
    );

    // si afectaSaldo es true, más adelante le vamos a avisar a la otra app
    // por ahora lo dejo preparado
    /*
    if (noti.afectaSaldo) {
      descontarSaldo(noti.monto);
    }
    */

    indice++;

    //programo la próxima notificación
    setTimeout(siguiente, intervaloMs);
  }
  //disparo la primera
  siguiente();
}
