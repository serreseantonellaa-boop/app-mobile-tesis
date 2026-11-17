// ---------------------------------------------
// Datos de las notificaciones (revisados con Antonella el 2026-11-15)
//
// familia: app de origen. Define cómo se ve la notificación
//   whatsapp, banco, gmail, calendario, obrasocial
// impacto: cuánto estrés suma en la notebook (bajo, medio, alto)
//   Las 4 de impacto alto aparecen en todas las sesiones.
// banco: titulo + detalle se usan para el diseño (monto aparte en rojo).
//   mensaje es el texto completo que se manda a la notebook.
// afectaSaldo: true = descuenta "monto" del presupuesto en la notebook
// ---------------------------------------------

let datosNotificaciones = {

  pool: [
    // --- CUIDADO / ESCUELA / HIJOS ---
    {
      id: "c01",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 5°B",
      categoria: "cuidado",
      mensaje: "¿Quién puede llevar algo para la mesa dulce del viernes?",
      afectaSaldo: false,
      monto: 0,
      esGrupo: true
    },
    {
      id: "c02",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 5°B",
      categoria: "cuidado",
      mensaje: "Recordá que mañana no hay clase por jornada docente.",
      afectaSaldo: false,
      monto: 0,
      esGrupo: true
    },
    {
      id: "c03",
      familia: "whatsapp",
      impacto: "alto",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Escuela",
      categoria: "cuidado",
      mensaje: "Tu hijo se siente mal, necesitamos que lo retiren.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c04",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 5°B",
      categoria: "cuidado",
      mensaje: "¿Llevar algo mañana para el cumple de la seño?",
      afectaSaldo: false,
      monto: 0,
      esGrupo: true
    },
    {
      id: "c05",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Escuela",
      categoria: "cuidado",
      mensaje: "Mañana hay acto. Recordá enviar la autorización firmada.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c06",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 5°B",
      categoria: "cuidado",
      mensaje: "Hay piojos en el grado. Revisá a tu hijo esta noche.",
      afectaSaldo: false,
      monto: 0,
      esGrupo: true
    },
    {
      id: "c07",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Mamá",
      categoria: "cuidado",
      mensaje: "¿A qué hora lo paso a buscar? No me dijiste nada.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c08",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 5°B",
      categoria: "cuidado",
      mensaje: "Pasaron la lista de materiales para el proyecto. Son 12 cosas.",
      afectaSaldo: false,
      monto: 0,
      esGrupo: true
    },
    {
      id: "c09",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Vecina",
      categoria: "cuidado",
      mensaje: "¿Podés cuidarme a los míos una hora? Tengo que ir al médico.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "c10",
      familia: "whatsapp",
      impacto: "alto",
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
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Pediatra Online",
      categoria: "salud",
      mensaje: "Turno pediátrico confirmado para mañana a las 18:30.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s02",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Farmacia Central",
      categoria: "salud",
      mensaje: "Receta lista para retirar. Tenés 24 horas antes de que caduque.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s03",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Pediatra Online",
      categoria: "salud",
      mensaje: "Recordatorio: traer los análisis de sangre a la consulta.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s04",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Farmacia Central",
      categoria: "salud",
      mensaje: "Tu pedido de medicamentos está listo. Total: $12.500.",
      afectaSaldo: true,
      monto: 12500
    },
    {
      id: "s05",
      familia: "obrasocial",
      impacto: "medio",
      icono: "assets/imgs/icono-obrasocial.svg",
      nombreApp: "SaludPlus Obra Social",
      categoria: "salud",
      mensaje: "Autorización rechazada: el estudio requiere documentación adicional.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "s06",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Dentista",
      categoria: "salud",
      mensaje: "Turno para Mateo el jueves 10:00. Confirmar.",
      afectaSaldo: false,
      monto: 0
    },

    // --- TRABAJO ---
    {
      id: "t01",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente diseño",
      categoria: "trabajo",
      mensaje: "Hola, ¿podremos adelantar la entrega para esta noche?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t02",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente web",
      categoria: "trabajo",
      mensaje: "Te dejé nuevos cambios URGENTES en el documento compartido.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t03",
      familia: "whatsapp",
      impacto: "alto",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Jefa",
      categoria: "trabajo",
      mensaje: "¿Terminaste el informe? Lo necesito antes de las 17.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t04",
      familia: "gmail",
      impacto: "bajo",
      icono: "assets/imgs/icono-gmail.svg",
      nombreApp: "Plataforma freelance",
      categoria: "trabajo",
      mensaje: "Nueva solicitud de presupuesto. Si no respondés hoy, vence.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t05",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente",
      categoria: "trabajo",
      mensaje: "No entiendo nada del archivo que mandaste. Llamame.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t06",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Compañera trabajo",
      categoria: "trabajo",
      mensaje: "¿Podés cubrirme mañana? Te debo una.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "t07",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Cliente diseño",
      categoria: "trabajo",
      mensaje: "¿Podés hacer esto que no estaba presupuestado?",
      afectaSaldo: false,
      monto: 0
    },

    // --- DINERO (banco) ---
    {
      id: "d01",
      familia: "banco",
      impacto: "bajo",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Se debitó tu suscripción mensual a Netflix: $8.000",
      afectaSaldo: true,
      monto: 8000,
      titulo: "Débito automático",
      detalle: "Suscripción mensual a Netflix."
    },
    {
      id: "d02",
      familia: "banco",
      impacto: "bajo",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Se debitó tu suscripción a Disney+: $11.000",
      afectaSaldo: true,
      monto: 11000,
      titulo: "Débito automático",
      detalle: "Suscripción a Disney+."
    },
    {
      id: "d03",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Escuela",
      categoria: "dinero",
      mensaje: "Salida educativa al museo el jueves. Costo: $20.000 por alumno.",
      afectaSaldo: true,
      monto: 20000
    },
    {
      id: "d05",
      familia: "banco",
      impacto: "bajo",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Se debitó Spotify Familiar: $6.000",
      afectaSaldo: true,
      monto: 6000,
      titulo: "Débito automático",
      detalle: "Spotify Familiar."
    },
    {
      id: "d06",
      familia: "banco",
      impacto: "bajo",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Comisión por mantenimiento de cuenta cobrada: $3.200",
      afectaSaldo: true,
      monto: 3200,
      titulo: "Comisión cobrada",
      detalle: "Mantenimiento de cuenta."
    },
    {
      id: "d07",
      familia: "banco",
      impacto: "bajo",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Débito seguro de vida obligatorio: $4.500",
      afectaSaldo: true,
      monto: 4500,
      titulo: "Débito automático",
      detalle: "Seguro de vida obligatorio."
    },
    {
      id: "d08",
      familia: "banco",
      impacto: "medio",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Pago mínimo tarjeta de crédito: $22.000",
      afectaSaldo: true,
      monto: 22000,
      titulo: "Pago mínimo de tarjeta",
      detalle: "Tarjeta de crédito."
    },
    {
      id: "d09",
      familia: "banco",
      impacto: "medio",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Alerta: tu saldo disponible es bajo.",
      afectaSaldo: false,
      monto: 0,
      titulo: "Alerta",
      detalle: "Tu saldo disponible es bajo."
    },
    {
      id: "d10",
      familia: "banco",
      impacto: "alto",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "dinero",
      mensaje: "Débito automático rechazado por fondos insuficientes.",
      afectaSaldo: false,
      monto: 0,
      titulo: "Débito rechazado",
      detalle: "Fondos insuficientes."
    },

    // --- SERVICIOS (débitos atrasados del mes anterior) ---
    {
      id: "sv01",
      familia: "banco",
      impacto: "medio",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "servicios",
      mensaje: "Débito automático Edenor: factura vencida del mes anterior $18.500",
      afectaSaldo: true,
      monto: 18500,
      titulo: "Débito automático",
      detalle: "Edenor: factura vencida del mes anterior."
    },
    {
      id: "sv02",
      familia: "banco",
      impacto: "medio",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "servicios",
      mensaje: "Débito automático Metrogas: factura pendiente del mes anterior $9.800",
      afectaSaldo: true,
      monto: 9800,
      titulo: "Débito automático",
      detalle: "Metrogas: factura pendiente del mes anterior."
    },
    {
      id: "sv03",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Administración del edificio",
      categoria: "servicios",
      mensaje: "Corte de agua en el edificio de 12 a 18 hs.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "sv04",
      familia: "banco",
      impacto: "medio",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "servicios",
      mensaje: "Débito automático Fibertel: factura vencida $15.200. Suspensión en 48 hs.",
      afectaSaldo: true,
      monto: 15200,
      titulo: "Débito automático",
      detalle: "Fibertel: factura vencida. Suspensión en 48 hs."
    },
    {
      id: "sv05",
      familia: "banco",
      impacto: "medio",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "servicios",
      mensaje: "Débito expensas atrasadas del mes anterior: $32.000",
      afectaSaldo: true,
      monto: 32000,
      titulo: "Débito automático",
      detalle: "Expensas atrasadas del mes anterior."
    },
    {
      id: "sv06",
      familia: "banco",
      impacto: "bajo",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "servicios",
      mensaje: "Débito recargo por mora Cablevision: $2.400",
      afectaSaldo: true,
      monto: 2400,
      titulo: "Débito automático",
      detalle: "Recargo por mora Cablevision."
    },
    {
      id: "sv07",
      familia: "banco",
      impacto: "medio",
      icono: "assets/imgs/icono-banco.png",
      nombreApp: "Galicia",
      categoria: "servicios",
      mensaje: "Débito automático línea celular: deuda pendiente $7.600. Riesgo de suspensión.",
      afectaSaldo: true,
      monto: 7600,
      titulo: "Débito automático",
      detalle: "Línea celular: deuda pendiente. Riesgo de suspensión."
    },

    // --- RECORDATORIOS ---
    {
      id: "r01",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Caro",
      categoria: "recordatorio",
      mensaje: "¿Viste mi mensaje de ayer?",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r02",
      familia: "whatsapp",
      impacto: "medio",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Lucía",
      categoria: "recordatorio",
      mensaje: "Necesito que me ayudes con algo urgente.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r03",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Amiga",
      categoria: "recordatorio",
      mensaje: "¿Estás bien? Hace días que no hablamos.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r04",
      familia: "gmail",
      impacto: "medio",
      icono: "assets/imgs/icono-gmail.svg",
      nombreApp: "ARCA",
      categoria: "recordatorio",
      mensaje: "Presentación de DDJJ vence en 3 días.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r05",
      familia: "calendario",
      impacto: "bajo",
      icono: "assets/imgs/icono-calendario.svg",
      nombreApp: "Reunión",
      categoria: "recordatorio",
      mensaje: "Zoom en 10 minutos. No te olvides.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r06",
      familia: "gmail",
      impacto: "bajo",
      icono: "assets/imgs/icono-gmail.svg",
      nombreApp: "Delivery",
      categoria: "recordatorio",
      mensaje: "El repartidor no encuentra tu dirección. Llamalo.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r07",
      familia: "calendario",
      impacto: "medio",
      icono: "assets/imgs/icono-calendario.svg",
      nombreApp: "Alarma",
      categoria: "recordatorio",
      mensaje: "Pagar el alquiler. Hoy vence.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r08",
      familia: "gmail",
      impacto: "bajo",
      icono: "assets/imgs/icono-gmail.svg",
      nombreApp: "Google",
      categoria: "recordatorio",
      mensaje: "Nueva actividad de inicio de sesión detectada.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r09",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Grupo familias 5°B",
      categoria: "recordatorio",
      mensaje: "3 mensajes sin leer.",
      afectaSaldo: false,
      monto: 0,
      esGrupo: true
    },
    {
      id: "r10",
      familia: "calendario",
      impacto: "bajo",
      icono: "assets/imgs/icono-calendario.svg",
      nombreApp: "Calendario",
      categoria: "recordatorio",
      mensaje: "Mañana: reunión de padres 18:30. No faltar.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r11",
      familia: "whatsapp",
      impacto: "bajo",
      icono: "assets/imgs/icono-wtsap.png",
      nombreApp: "Mamá",
      categoria: "recordatorio",
      mensaje: "Te mandó un audio de 4 minutos.",
      afectaSaldo: false,
      monto: 0
    },
    {
      id: "r12",
      familia: "gmail",
      impacto: "medio",
      icono: "assets/imgs/icono-gmail.svg",
      nombreApp: "Seguro",
      categoria: "recordatorio",
      mensaje: "Cuota atrasada. Póliza en riesgo de suspensión.",
      afectaSaldo: false,
      monto: 0
    }
  ],

  // =============================================
  // PARTITURA DE LOS 2 MINUTOS
  // Cuándo aparece cada notificación (en segundos desde que arranca).
  // La presión crece por tramos. Todo se ajusta acá.
  // =============================================
  partitura: {
    duracionTotal: 118,     // deja de mandar 2 segundos antes del final
    vidaNotificacion: 6,    // todas duran lo mismo en pantalla (segundos)

    // Tramos: desde, hasta, cada cuántos segundos (mínimo y máximo)
    tramos: [
      { desde: 2,  hasta: 30,  cadaMin: 3.5, cadaMax: 4.5 },  // arranque: se puede leer
      { desde: 30, hasta: 80,  cadaMin: 2,   cadaMax: 3 },    // se acelera
      { desde: 80, hasta: 118, cadaMin: 1,   cadaMax: 1.5 }   // saturación
    ],

    // Ráfagas: varias notificaciones casi juntas
    rafagas: [
      { segundo: 44, cantidad: 3 },
      { segundo: 64, cantidad: 3 }
    ],

    // Las 4 de impacto alto, siempre en el mismo momento
    fijas: [
      { segundo: 20, id: "c10" },   // Ex pareja
      { segundo: 48, id: "t03" },   // Jefa
      { segundo: 72, id: "c03" },   // Escuela: tu hijo se siente mal
      { segundo: 95, id: "d10" }    // Débito rechazado (antes de que llegue el freelance)
    ]
  },

  // =============================================
  // PESOS POR CATEGORÍA (para la selección aleatoria)
  // Más peso = más probabilidad de aparecer
  // =============================================
  pesos: {
    cuidado: 5,
    trabajo: 4,
    recordatorio: 4,
    salud: 3,
    dinero: 2,
    servicios: 2
  }
};
