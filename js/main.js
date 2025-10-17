// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa los iconos Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // Menú móvil
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Botón de reservar ahora en hero -> WhatsApp
  const heroReservaBtn = document.getElementById('heroReservaBtn');
  if (heroReservaBtn) {
    heroReservaBtn.addEventListener('click', () => {
      const urlWhatsApp = "https://wa.me/524778510780?text=Hola,%20quiero%20hacer%20una%20reserva%20en%20Hotel%20Brisa%20del%20Baj%C3%ADo";
      window.open(urlWhatsApp, "_blank");
    });
  }

  // Formulario contacto -> enviar a WhatsApp al enviar
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const mensaje = document.getElementById('mensaje').value;

      const texto = `Hola,%20mi%20nombre%20es%20${encodeURIComponent(nombre)},%20mi%20correo%20es%20${encodeURIComponent(correo)},%20y%20este%20es%20mi%20mensaje:%20${encodeURIComponent(mensaje)}`;
      const url = `https://wa.me/524778510780?text=${texto}`;
      window.open(url, "_blank");

      contactForm.reset();
    });
  }

  // Animaciones al hacer scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
