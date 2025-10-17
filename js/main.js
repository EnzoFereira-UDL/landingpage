// js/main.js
document.addEventListener('DOMContentLoaded', () => {

  // Inicialización de iconos Lucide
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
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // Smooth scroll para anchors internas (ignora enlaces que abren WhatsApp)
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

  // Reveal on scroll con IntersectionObserver (fallback incluido)
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
    const revealOnScrollFallback = () => {
      const triggerBottom = window.innerHeight * 0.85;
      revealEls.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) el.classList.add('visible');
      });
    };
    window.addEventListener('scroll', revealOnScrollFallback);
    revealOnScrollFallback();
  }

  // ----- RESERVAR AHORA: abrir WhatsApp con datos del formulario -----
  const reserveBtn = document.getElementById('reserveBtn');
  const whatsappNumber = '524778510780'; // número en formato internacional (sin +)
  if (reserveBtn) {
    reserveBtn.addEventListener('click', () => {
      const checkinEl = document.getElementById('checkin');
      const checkoutEl = document.getElementById('checkout');
      const guestsEl = document.getElementById('guests');

      const checkin = checkinEl && checkinEl.value ? checkinEl.value : 'No especificado';
      const checkout = checkoutEl && checkoutEl.value ? checkoutEl.value : 'No especificado';
      const guests = guestsEl && guestsEl.value ? guestsEl.value : 'No especificado';

      const msg = `Hola,%20me%20gustaría%20reservar%20una%20estancia%20en%20Hotel%20Brisa%20del%20Bajío.%0ALlegada:%20${encodeURIComponent(checkin)}%0ASalida:%20${encodeURIComponent(checkout)}%0AHuéspedes:%20${encodeURIComponent(guests)}%0A¿Me%20pueden%20confirmar%20disponibilidad%20y%20tarifas?`;

      const url = `https://wa.me/${whatsappNumber}?text=${msg}`;

      // Abrir en nueva pestaña
      window.open(url, '_blank');
    });
  }

  // ----- Contact form simple: evita submit real y abre WhatsApp (opcional) -----
  // Si prefieres que el formulario de contacto envíe por WhatsApp en lugar de POST, descomenta lo siguiente:
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('contactNombre')?.value || 'No especificado';
      const email = document.getElementById('contactEmail')?.value || 'No especificado';
      const telefono = document.getElementById('contactTel')?.value || 'No especificado';
      const asunto = document.getElementById('contactAsunto')?.value || 'No especificado';
      const mensaje = document.getElementById('contactMensaje')?.value || 'No especificado';

      // Si quieres enviar por WhatsApp en vez de enviar el formulario al servidor, usa la siguiente línea:
      const contactMsg = `Hola,%20mi%20nombre%20es%20${encodeURIComponent(nombre)}.%0AAsunto:%20${encodeURIComponent(asunto)}%0AEmail:%20${encodeURIComponent(email)}%0ATeléfono:%20${encodeURIComponent(telefono)}%0AMensaje:%20${encodeURIComponent(mensaje)}`;
      const contactUrl = `https://wa.me/${whatsappNumber}?text=${contactMsg}`;

      // Abrir WhatsApp
      window.open(contactUrl, '_blank');

      // Si prefieres enviar el formulario al servidor, reemplaza la apertura de WhatsApp por contactForm.submit()
    });
  }

});