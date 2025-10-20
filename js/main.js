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

// --- Formulario de reserva (solo ejemplo de evento) ---
const reservaForm = document.getElementById("reservaForm");
reservaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Tu reserva ha sido enviada correctamente.");
  reservaForm.reset();
});

// --- Formulario de contacto ---
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Gracias por contactarnos. Te responderemos pronto.");
  contactForm.reset();
});

// --- Iconos Lucide ---
lucide.createIcons();