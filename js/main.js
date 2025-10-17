// js/main.js
document.addEventListener('DOMContentLoaded', () => {

  // Inicialización de iconos Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // ----- Menú móvil -----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // ----- Smooth Scroll -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Animaciones Reveal on Scroll -----
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    const revealFallback = () => {
      const triggerBottom = window.innerHeight * 0.85;
      revealEls.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) el.classList.add('visible');
      });
    };
    window.addEventListener('scroll', revealFallback);
    revealFallback();
  }

  // ----- BOTÓN RESERVAR AHORA (WhatsApp) -----
  const reserveBtn = document.getElementById('reserveBtn');
  const whatsappNumber = '524778510780'; // número sin el símbolo '+'

  if (reserveBtn) {
    reserveBtn.addEventListener('click', () => {
      const checkin = document.getElementById('checkin')?.value || '';
      const checkout = document.getElementById('checkout')?.value || '';
      const guests = document.getElementById('guests')?.value || '';
      const roomType = document.getElementById('roomType')?.value || '';

      if (!checkin || !checkout || !guests || !roomType) {
        alert('Por favor completa todos los campos antes de reservar.');
        return;
      }

      const msg = `
Hola, me gustaría hacer una reserva en Hotel Brisa del Bajío:
📅 Desde: ${checkin}
📅 Hasta: ${checkout}
👥 Huéspedes: ${guests}
🏨 Habitación: ${roomType}
¿Podrían confirmarme disponibilidad y tarifas, por favor?`;

      const encodedMsg = encodeURIComponent(msg);
      const url = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
      window.open(url, '_blank');
    });
  }

  // ----- FORMULARIO DE CONTACTO -----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('contactNombre')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const telefono = document.getElementById('contactTel')?.value || '';
      const asunto = document.getElementById('contactAsunto')?.value || '';
      const mensaje = document.getElementById('contactMensaje')?.value || '';

      const contactMsg = `
Hola, soy ${nombre}.
📧 Correo: ${email}
📞 Teléfono: ${telefono}
📝 Asunto: ${asunto}

Mensaje:
${mensaje}`;

      const encodedMsg = encodeURIComponent(contactMsg);
      const contactUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
      window.open(contactUrl, '_blank');
    });
  }

});
