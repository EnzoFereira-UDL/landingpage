document.addEventListener('DOMContentLoaded', () => {
  // lucide icons
  if (window.lucide) try { lucide.createIcons(); } catch (err) { /* ignore */ }

  // Mobile menu toggle (safe guards)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }

  // Helper to open WhatsApp with message
  function openWhatsApp(message) {
    const phone = '524778510780';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }

  // Reserva form
  const reservaForm = document.getElementById('reservaForm');
  if (reservaForm) {
    reservaForm.addEventListener('submit', e => {
      e.preventDefault();
      const checkin = document.getElementById('checkin')?.value || '';
      const checkout = document.getElementById('checkout')?.value || '';
      const personas = document.getElementById('personas')?.value || '';
      const habitacion = document.getElementById('habitacion')?.value || '';
      const numHabitaciones = document.getElementById('num_habitaciones')?.value || '1';

      // Build message exactly as requested
      const mensaje = `Quiero agendar ${numHabitaciones} habitación(es) - ${habitacion} - para ${personas} persona(s) del ${checkin} al ${checkout}.`;
      openWhatsApp(mensaje);
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const nombre = document.getElementById('nombre')?.value || '';
      const correo = document.getElementById('correo')?.value || '';
      const checkin = document.getElementById('checkin_contact')?.value || '';
      const checkout = document.getElementById('checkout_contact')?.value || '';
      const personas = document.getElementById('personas_contact')?.value || '';
      const habitacion = document.getElementById('habitacion_contact')?.value || '';
      const numHabitaciones = document.getElementById('num_habitaciones_contact')?.value || '1';
      const mensajeExtra = document.getElementById('mensaje')?.value || '';

      const texto = `Hola, mi nombre es ${nombre}. Quiero agendar ${numHabitaciones} habitación(es) - ${habitacion} - para ${personas} persona(s) del ${checkin} al ${checkout}. Correo: ${correo}. Mensaje adicional: ${mensajeExtra}`;
      openWhatsApp(texto);
      contactForm.reset();
    });
  }

  // Header "RESERVAR AHORA" button behavior:
  // - Si el usuario ya llenó campos en el formulario, lo lleva a WhatsApp con esos datos.
  // - Si no, hace scroll al formulario para que el usuario lo complete.
  const heroReserveBtn = document.getElementById('heroReserveBtn');
  if (heroReserveBtn) {
    heroReserveBtn.addEventListener('click', () => {
      const checkin = document.getElementById('checkin')?.value || '';
      const checkout = document.getElementById('checkout')?.value || '';
      const personas = document.getElementById('personas')?.value || '';
      const habitacion = document.getElementById('habitacion')?.value || '';
      const numHabitaciones = document.getElementById('num_habitaciones')?.value || '';

      // If basic booking info exists, open WhatsApp immediately
      const hasInfo = checkin || checkout || personas || habitacion || numHabitaciones;
      if (hasInfo) {
        const mensaje = `Quiero agendar ${numHabitaciones ? numHabitaciones : '1'} habitación(es) - ${habitacion ? habitacion : 'Tipo no especificado'} - para ${personas ? personas : 'N° personas no especificado'} persona(s) del ${checkin ? checkin : 'fecha no especificada'} al ${checkout ? checkout : 'fecha no especificada'}.`;
        openWhatsApp(mensaje);
      } else {
        // scroll to booking form
        const bookingEl = document.getElementById('booking-form');
        if (bookingEl) {
          bookingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // focus first field if present
          const firstInput = bookingEl.querySelector('input, select, textarea');
          if (firstInput) firstInput.focus({ preventScroll: true });
        } else {
          // fallback: open general WhatsApp
          openWhatsApp('Hola, quiero reservar una habitación. ¿Me pueden ayudar?');
        }
      }
    });
  }

  // Efficiently enable small reveal-on-scroll (optional simple implementation)
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) en.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => obs.observe(el));
  }
});