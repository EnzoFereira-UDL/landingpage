// --- Animación al hacer scroll ---
const revealElements = document.querySelectorAll(".reveal-on-scroll");
const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// --- Menú móvil ---
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// --- PUNTO 1: Formulario de reserva con redirección a WhatsApp ---
const reservaForm = document.getElementById("reservaForm");
reservaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Número de teléfono de WhatsApp (el que tenías en el botón flotante)
  const telefono = "524778510780";
  
  // Obtener valores del formulario
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const personas = document.getElementById("personas").value;
  const habitacion = document.getElementById("habitacion").value;
  
  // Formatear el mensaje
  let mensaje = `¡Hola! Me gustaría solicitar una reserva:\n\n`;
  mensaje += `Seria en la(s) habitacion(es) ${habitacion}\n`;
  mensaje += `Para el dia: ${checkin}\n`;
  mensaje += `Hasta: ${checkout}\n`;
  mensaje += `Con ${personas} personas\n\n`;
  mensaje += `Espero su confirmación. ¡Gracias!`;
  
  // Codificar mensaje para URL
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  
  // Abrir WhatsApp en una nueva pestaña
  window.open(url, '_blank');
  
  // Limpiamos el formulario
  reservaForm.reset();
});

// --- PUNTO 1: Formulario de contacto con redirección a WhatsApp ---
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Número de teléfono
  const telefono = "524778510780";

  // Obtener valores
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const mensajeUsuario = document.getElementById("mensaje").value;
  
  // Formatear el mensaje
  let mensaje = `¡Hola! Mi nombre es ${nombre} ${apellido}.\n\n`;
  mensaje += `\n${mensajeUsuario}`;
  
  // Codificar mensaje para URL
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  
  // Abrir WhatsApp en una nueva pestaña
  window.open(url, '_blank');

  // Limpiamos el formulario
  contactForm.reset();
});

// --- Iconos Lucide ---
lucide.createIcons();