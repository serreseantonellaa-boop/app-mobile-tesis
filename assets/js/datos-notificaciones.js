// ---------------------------------------------
// Datos de las notificaciones
// 3 ráfagas, 4 mensajes por ráfaga:
// - cuidado / escuela / hijo
// - salud
// - trabajo / clientes / encargos
// - dinero (banco + suscripciones tipo Netflix / Disney+, etc.)
// ---------------------------------------------

let datosNotificaciones = {
  rafaga1: [
    {
      id: "r1_cuidado",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo madres jardín",
      categoria: "cuidado",
      mensaje: "¿Quién puede llevar algo para la mesa dulce del viernes?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r1_salud",
      icono: "assets/imgs/icono-pediatra.png",
      nombreApp: "Pediatra Online",
      categoria: "salud",
      mensaje: "Turno pediátrico confirmado para mañana a las 18:30.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r1_trabajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente diseño",
      categoria: "trabajo",
      mensaje: "Hola, ¿podremos adelantar la entrega del material para esta noche?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r1_dinero",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Galicia",
      categoria: "dinero",
      mensaje: "Se debitó tu suscripción mensual a Netflix.",
      afectaSaldo: true,
      monto: 8000
    }
  ],

  rafaga2: [
    {
      id: "r2_cuidado",
      icono: "assets/imgs/icono-escuela.png",
      nombreApp: "Escuela",
      categoria: "cuidado",
      mensaje: "Mañana hay acto en el colegio. Recordá enviar la autorización firmada.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r2_salud",
      icono: "assets/imgs/icono-farmacia.png",
      nombreApp: "Farmacia Central",
      categoria: "salud",
      mensaje: "Receta lista para retirar. Tenés 24 horas antes de que caduque.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r2_trabajo",
      icono: "assets/imgs/icono-cliente2.png",
      nombreApp: "Cliente web",
      categoria: "trabajo",
      mensaje: "Te dejé nuevos cambios URGENTES en el documento compartido.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r2_dinero",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Aurora",
      categoria: "dinero",
      mensaje: "Se debitó tu suscripción a Disney+. Revisá tu saldo disponible.",
      afectaSaldo: true,
      monto: 11000
    }
  ],

  rafaga3: [
    {
      id: "r3_cuidado",
      icono: "assets/imgs/icono-jardin.png",
      nombreApp: "Jardín sala amarilla",
      categoria: "cuidado",
      mensaje: "Tu hijo se siente mal, necesitamos que lo retiren.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r3_salud",
      icono: "assets/imgs/icono-prepaga.png",
      nombreApp: "Prepaga SaludPlus",
      categoria: "salud",
      mensaje: "Recordatorio: pago de la cuota vence hoy.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r3_trabajo",
      icono: "assets/imgs/icono-plataforma.png",
      nombreApp: "Plataforma freelance",
      categoria: "trabajo",
      mensaje: "Nueva solicitud de presupuesto. Si no respondés hoy, vence la propuesta.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r3_dinero",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Banco Aurora",
      categoria: "dinero",
      mensaje: "Se debitó tu suscripción a Spotify Familiar.",
      afectaSaldo: true,
      monto: 6000
    }
  ]
};
