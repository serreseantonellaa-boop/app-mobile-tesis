// ---------------------------------------------
// Datos de las notificaciones
// Pool grande de notificaciones organizadas por categoría.
// El sistema las elige de forma aleatoria con pesos por categoría.
// Categorías: cuidado, salud, trabajo, dinero, servicios, recordatorio
// afectaSaldo: true = descuenta monto del presupuesto en la notebook
// ---------------------------------------------

let datosNotificaciones = {

  // =============================================
  // POOL COMPLETO DE NOTIFICACIONES
  // =============================================
  pool: [
    // --- CUIDADO / ESCUELA / HIJOS ---
    {
      id: "c01",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo madres jardín",
      categoria: "cuidado",
      mensaje: "¿Quién puede llevar algo para la mesa dulce del viernes?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c02",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo madres jardín",
      categoria: "cuidado",
      mensaje: "Recordá que mañana no hay clase por jornada docente.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c03",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Jardín sala amarilla",
      categoria: "cuidado",
      mensaje: "Tu hijo se siente mal, necesitamos que lo retiren.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c04",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 3°B",
      categoria: "cuidado",
      mensaje: "¿Llevar algo mañana para el cumple de la seño?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c05",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Escuela",
      categoria: "cuidado",
      mensaje: "Mañana hay acto. Recordá enviar la autorización firmada.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c06",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo madres jardín",
      categoria: "cuidado",
      mensaje: "Hay piojos en la sala. Revisá a tu hijo/a esta noche.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c07",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Mamá",
      categoria: "cuidado",
      mensaje: "¿A qué hora lo paso a buscar? No me dijiste nada.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c08",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 3°B",
      categoria: "cuidado",
      mensaje: "Pasaron la lista de materiales para el proyecto. Son 12 cosas.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c09",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Vecina",
      categoria: "cuidado",
      mensaje: "¿Podés cuidarme a los míos una hora? Tengo que ir al médico.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c10",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Ex pareja",
      categoria: "cuidado",
      mensaje: "Este finde no puedo. Fijate vos.",
      afectaSaldo: false,
      monto: 0
    },

    // --- SALUD ---
    {
      id: "s01",
      icono: "assets/imgs/icono-pediatra.png",
      nombreApp: "Pediatra Online",
      categoria: "salud",
      mensaje: "Turno pediátrico confirmado para mañana a las 18:30.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s02",
      icono: "assets/imgs/icono-farmacia.png",
      nombreApp: "Farmacia Central",
      categoria: "salud",
      mensaje: "Receta lista para retirar. Tenés 24 horas antes de que caduque.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s03",
      icono: "assets/imgs/icono-pediatra.png",
      nombreApp: "Pediatra Online",
      categoria: "salud",
      mensaje: "Recordatorio: traer los análisis de sangre a la consulta.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s04",
      icono: "assets/imgs/icono-farmacia.png",
      nombreApp: "Farmacia Central",
      categoria: "salud",
      mensaje: "Tu pedido de medicamentos está listo. Total: $12.500.",
      afectaSaldo: true,
      monto: 12500
    },
    {
      id: "s05",
      icono: "assets/imgs/icono-pediatra.png",
      nombreApp: "Prepaga SaludPlus",
      categoria: "salud",
      mensaje: "Recordatorio: pago de la cuota vence hoy.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s06",
      icono: "assets/imgs/icono-pediatra.png",
      nombreApp: "Dentista",
      categoria: "salud",
      mensaje: "Turno para Mateo el jueves 10:00. Confirmar.",
      afectaSaldo: false,
      monto: 0
    },

    // --- TRABAJO / CLIENTES ---
    {
      id: "t01",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente diseño",
      categoria: "trabajo",
      mensaje: "Hola, ¿podremos adelantar la entrega para esta noche?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t02",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente web",
      categoria: "trabajo",
      mensaje: "Te dejé nuevos cambios URGENTES en el documento compartido.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t03",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Jefa",
      categoria: "trabajo",
      mensaje: "¿Terminaste el informe? Lo necesito antes de las 17.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t04",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Plataforma freelance",
      categoria: "trabajo",
      mensaje: "Nueva solicitud de presupuesto. Si no respondés hoy, vence.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t05",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente",
      categoria: "trabajo",
      mensaje: "No entiendo nada del archivo que mandaste. Llamame.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t06",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Compañera trabajo",
      categoria: "trabajo",
      mensaje: "¿Podés cubrirme mañana? Te debo una.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t07",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente diseño",
      categoria: "trabajo",
      mensaje: "¿Podés hacer esto que no estaba presupuestado?",
      afectaSaldo: false,
      monto: 0
    },

    // --- DINERO / BANCO / DÉBITOS ---
    {
      id: "d01",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Se debitó tu suscripción mensual a Netflix: $8.000",
      afectaSaldo: true,
      monto: 8000
    },
    {
      id: "d02",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Se debitó tu suscripción a Disney+: $11.000",
      afectaSaldo: true,
      monto: 11000
    },
    {
      id: "d03",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Débito automático cuota escolar: $45.000",
      afectaSaldo: true,
      monto: 45000
    },
    {
      id: "d04",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Débito prepaga SaludPlus: $38.000",
      afectaSaldo: true,
      monto: 38000
    },
    {
      id: "d05",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Se debitó Spotify Familiar: $6.000",
      afectaSaldo: true,
      monto: 6000
    },
    {
      id: "d06",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Comisión por mantenimiento de cuenta cobrada: $3.200",
      afectaSaldo: true,
      monto: 3200
    },
    {
      id: "d07",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Débito seguro de vida obligatorio: $4.500",
      afectaSaldo: true,
      monto: 4500
    },
    {
      id: "d08",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Pago mínimo tarjeta de crédito: $22.000",
      afectaSaldo: true,
      monto: 22000
    },
    {
      id: "d09",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Alerta: tu saldo disponible es bajo.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "d10",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Cheque rechazado por fondos insuficientes.",
      afectaSaldo: false,
      monto: 0
    },

    // --- SERVICIOS / FACTURAS ---
    {
      id: "sv01",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Edenor",
      categoria: "servicios",
      mensaje: "Factura de luz vencida. Total: $18.500. Último aviso.",
      afectaSaldo: true,
      monto: 18500
    },
    {
      id: "sv02",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Metrogas",
      categoria: "servicios",
      mensaje: "Factura de gas pendiente: $9.800",
      afectaSaldo: true,
      monto: 9800
    },
    {
      id: "sv03",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Aysa",
      categoria: "servicios",
      mensaje: "Corte de agua en tu zona de 12 a 18hs.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "sv04",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Fibertel",
      categoria: "servicios",
      mensaje: "Factura de internet vencida: $15.200. Suspensión en 48hs.",
      afectaSaldo: true,
      monto: 15200
    },
    {
      id: "sv05",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Consorcio",
      categoria: "servicios",
      mensaje: "Expensas de este mes: $32.000. Vence el viernes.",
      afectaSaldo: true,
      monto: 32000
    },
    {
      id: "sv06",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Cablevision",
      categoria: "servicios",
      mensaje: "Mora por pago fuera de término. Recargo: $2.400.",
      afectaSaldo: true,
      monto: 2400
    },
    {
      id: "sv07",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Celular",
      categoria: "servicios",
      mensaje: "Tu línea será suspendida por falta de pago: $7.600",
      afectaSaldo: true,
      monto: 7600
    },

    // --- RECORDATORIOS / RUIDO ATENCIONAL ---
    {
      id: "r01",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "WhatsApp",
      categoria: "recordatorio",
      mensaje: "¿Viste mi mensaje de ayer?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r02",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "WhatsApp",
      categoria: "recordatorio",
      mensaje: "Necesito que me ayudes con algo urgente.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r03",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Amiga",
      categoria: "recordatorio",
      mensaje: "¿Estás bien? Hace días que no hablamos.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r04",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "AFIP",
      categoria: "recordatorio",
      mensaje: "Presentación de DDJJ vence en 3 días.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r05",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Reunión",
      categoria: "recordatorio",
      mensaje: "Zoom en 10 minutos. No te olvides.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r06",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Delivery",
      categoria: "recordatorio",
      mensaje: "El repartidor no encuentra tu dirección. Llamalo.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r07",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Alarma",
      categoria: "recordatorio",
      mensaje: "Pagar el alquiler. Hoy vence.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r08",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Google",
      categoria: "recordatorio",
      mensaje: "Nueva actividad de inicio de sesión detectada.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r09",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "WhatsApp",
      categoria: "recordatorio",
      mensaje: "3 mensajes sin leer del grupo del colegio.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r10",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Calendario",
      categoria: "recordatorio",
      mensaje: "Mañana: reunión de padres 18:30. No faltar.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r11",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "WhatsApp",
      categoria: "recordatorio",
      mensaje: "Mamá te mandó un audio de 4 minutos.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r12",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Seguro",
      categoria: "recordatorio",
      mensaje: "Cuota atrasada. Póliza en riesgo de suspensión.",
      afectaSaldo: false,
      monto: 0
    }
  ],

  // =============================================
  // PESOS POR CATEGORÍA (para la selección aleatoria)
  // Más peso = más probabilidad de aparecer
  // =============================================
  pesos: {
    cuidado: 5,      // escuela/hijos: alta (WhatsApp sobre todo)
    trabajo: 4,      // clientes, jefa: media-alta
    recordatorio: 4,  // ruido atencional: media-alta
    salud: 3,        // turnos, medicamentos: media
    dinero: 2,       // débitos banco: baja (pocos pero impactantes)
    servicios: 2     // facturas: baja (pocos pero impactantes)
  }
};
