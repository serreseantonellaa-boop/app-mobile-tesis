// =============================================================
// SERVIDOR WEBSOCKET - INSTALACIÓN "EN UNA CABEZA MONOMARENTAL"
// =============================================================
// Este archivo corre en la notebook con Node.js.
// Su trabajo es:
// 1. Abrir un canal WebSocket en la red local (puerto 8080)
// 2. Recibir conexiones del celular y de la app de presupuesto
// 3. Reenviar mensajes entre ambos (es un puente)
// 4. Guardar los resultados de cada sesión en un archivo JSON
// =============================================================

// --- DEPENDENCIAS ---
// "ws" es la librería de WebSockets para Node.js (la que instalamos con npm)
// "fs" es un módulo nativo de Node.js para leer y escribir archivos
// "path" es un módulo nativo para manejar rutas de archivos
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

// --- CONFIGURACIÓN ---
// El puerto donde escucha el servidor. Ambas apps se conectan a este número.
const PUERTO = 8080;

// Ruta del archivo donde se guardan los resultados de cada sesión.
// Se crea automáticamente si no existe.
const ARCHIVO_RESULTADOS = path.join(__dirname, 'resultados-sesiones.json');

// --- CREAR EL SERVIDOR ---
const servidor = new WebSocket.Server({ port: PUERTO });

// Guardamos referencia a los clientes conectados por tipo.
// "notebook" es la app de presupuesto, "celular" es la app de notificaciones.
let clientes = {
  notebook: null,
  celular: null
};

// --- FUNCIÓN: CARGAR RESULTADOS EXISTENTES ---
// Si ya existe el archivo JSON con sesiones anteriores, lo lee.
// Si no existe, devuelve un array vacío.
function cargarResultados() {
  try {
    if (fs.existsSync(ARCHIVO_RESULTADOS)) {
      let contenido = fs.readFileSync(ARCHIVO_RESULTADOS, 'utf-8');
      return JSON.parse(contenido);
    }
  } catch (error) {
    console.log('Error al leer resultados anteriores:', error.message);
  }
  return [];
}

// --- FUNCIÓN: GUARDAR UN RESULTADO NUEVO ---
// Recibe los datos de una sesión terminada y los agrega al archivo JSON.
function guardarResultado(datosSesion) {
  let resultados = cargarResultados();
  resultados.push(datosSesion);

  try {
    fs.writeFileSync(ARCHIVO_RESULTADOS, JSON.stringify(resultados, null, 2), 'utf-8');
    console.log('Sesión guardada. Total de sesiones:', resultados.length);
  } catch (error) {
    console.log('Error al guardar resultado:', error.message);
  }
}

// --- EVENTO: NUEVA CONEXIÓN ---
// Cada vez que una app (celular o notebook) se conecta, entra acá.
servidor.on('connection', function(conexion, request) {

  console.log('Nueva conexión recibida');

  // --- EVENTO: MENSAJE RECIBIDO ---
  // Cada vez que llega un mensaje de cualquier cliente, entra acá.
  conexion.on('message', function(mensaje) {

    // Los mensajes viajan como texto. Los convertimos a objeto JavaScript.
    let datos;
    try {
      datos = JSON.parse(mensaje);
    } catch (error) {
      console.log('Mensaje no válido:', mensaje.toString());
      return;
    }

    console.log('Mensaje recibido:', datos.tipo);

    // --- IDENTIFICACIÓN ---
    // El primer mensaje que manda cada app es "identificar",
    // para que el servidor sepa quién es quién.
    if (datos.tipo === 'identificar') {
      // datos.rol puede ser "notebook" o "celular"
      clientes[datos.rol] = conexion;
      console.log('Cliente identificado:', datos.rol);

      // Confirmar al cliente que se registró bien
      conexion.send(JSON.stringify({
        tipo: 'identificado',
        rol: datos.rol,
        mensaje: 'Conectado al servidor'
      }));
      return;
    }

    // --- REENVÍO DE MENSAJES ---
    // Si el mensaje viene de la notebook, lo reenviamos al celular.
    // Si viene del celular, lo reenviamos a la notebook.

    // Mensaje START: la notebook le dice al celular que arranque
    if (datos.tipo === 'start') {
      if (clientes.celular && clientes.celular.readyState === WebSocket.OPEN) {
        clientes.celular.send(JSON.stringify(datos));
        console.log('START enviado al celular');
      }
      return;
    }

    // Mensaje STOP: la notebook le dice al celular que pare
    if (datos.tipo === 'stop') {
      if (clientes.celular && clientes.celular.readyState === WebSocket.OPEN) {
        clientes.celular.send(JSON.stringify(datos));
        console.log('STOP enviado al celular');
      }
      return;
    }

    // Mensaje RESET: la notebook le dice al celular que se reinicie
    if (datos.tipo === 'reset') {
      if (clientes.celular && clientes.celular.readyState === WebSocket.OPEN) {
        clientes.celular.send(JSON.stringify(datos));
        console.log('RESET enviado al celular');
      }
      return;
    }

    // Mensaje GASTO: el celular le avisa a la notebook que descuente plata
    if (datos.tipo === 'gasto') {
      if (clientes.notebook && clientes.notebook.readyState === WebSocket.OPEN) {
        clientes.notebook.send(JSON.stringify(datos));
        console.log('GASTO enviado a la notebook:', datos.origen, '-$' + datos.monto);
      }
      return;
    }

    // Mensaje RESULTADO: la notebook manda los datos finales de la sesión
    if (datos.tipo === 'resultado') {
      guardarResultado(datos.sesion);
      return;
    }

  });

  // --- EVENTO: CONEXIÓN CERRADA ---
  conexion.on('close', function() {
    // Limpiar la referencia cuando un cliente se desconecta
    if (clientes.notebook === conexion) {
      clientes.notebook = null;
      console.log('Notebook desconectada');
    }
    if (clientes.celular === conexion) {
      clientes.celular = null;
      console.log('Celular desconectado');
    }
  });

  // --- EVENTO: ERROR ---
  conexion.on('error', function(error) {
    console.log('Error en conexión:', error.message);
  });

});

// --- SERVIDOR LISTO ---
console.log('===========================================');
console.log('Servidor WebSocket corriendo en puerto', PUERTO);
console.log('Las apps deben conectarse a: ws://[IP-DE-ESTA-PC]:' + PUERTO);
console.log('===========================================');
console.log('');
console.log('Para saber la IP de esta PC:');
console.log('  - Windows: abrí otra terminal y escribí "ipconfig"');
console.log('  - Mac/Linux: abrí otra terminal y escribí "ifconfig"');
console.log('  - Buscá la dirección IPv4 de tu red Wi-Fi (ej: 192.168.1.XX)');
console.log('');
console.log('Esperando conexiones...');
