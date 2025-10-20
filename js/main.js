document.addEventListener('DOMContentLoaded', () => {
  // Init lucide icons safely
  if (window.lucide) try { lucide.createIcons(); } catch (err) {}

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }

  // Helper to open WhatsApp (use phone number provided)
  function openWhatsApp(message) {
    const phone = '524778510780';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }

  // Simple client-side validation helper
  function validateFields(fields) {
    // fields: array of {el: HTMLElement, name: 'Texto', required: bool}
    const errors = [];
    fields.forEach(f => {
      const v = (f.el?.value || '').toString().trim();
      if (f.required && !v) errors.push(f.name);
    });
    return errors;
  }

  // RESERVA FORM
  const reservaForm = document.getElementById('reservaForm');
  if (reservaForm) {
    reservaForm.addEventListener('submit', e => {
      e.preventDefault();

      const checkinEl = document.getElementById('checkin');
      const checkoutEl = document.getElementById('checkout');
      const personasEl = document.getElementById('personas');
      const numHabEl = document.getElementById('num_habitaciones');
      const habitacionEl = document.getElementById('habitacion');

      const required = [
        { el: checkinEl, name: 'Fecha de llegada', required: true },
        { el: checkoutEl, name: 'Fecha de salida', required: true },
        { el: personasEl, name: 'Personas', required: true },
        { el: numHabEl, name: 'Número de habitaciones', required: true },
        { el: habitacionEl, name: 'Tipo de habitación', required: true }
      ];

      const errors = validateFields(required);
      if (errors.length) {
        alert('Por favor completa: ' + errors.join(', '));
        return;
      }

      // optional: check date coherence (simple)
      const checkin = checkinEl.value;
      const checkout = checkoutEl.value;
      if (checkin && checkout && new Date(checkin) > new Date(checkout)) {
        alert('La fecha de llegada no puede ser mayor a la de salida.');
        return;
      }

      const personas = personasEl.value;
      const numHabitaciones = numHabEl.value;
      const habitacion = habitacionEl.value;

      const mensaje = `Quiero agendar ${numHabitaciones} habitación(es) - ${habitacion} - para ${personas} persona(s) del ${checkin} al ${checkout}.`;
      openWhatsApp(mensaje);
    });
  }

  // CONTACT FORM (simplified)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const nombreEl = document.getElementById('contact_nombre');
      const apellidoEl = document.getElementById('contact_apellido');
      const mensajeEl = document.getElementById('contact_mensaje');

      const required = [
        { el: nombreEl, name: 'Nombre', required: true },
        { el: mensajeEl, name: 'Mensaje', required: true }
      ];

      const errors = validateFields(required);
      if (errors.length) {
        alert('Faltan campos obligatorios: ' + errors.join(', '));
        return;
      }

      const nombre = nombreEl.value.trim();
      const apellido = (apellidoEl.value || '').trim();
      const mensaje = mensajeEl.value.trim();

      const texto = `¡Hola! Soy ${nombre}${apellido ? ' ' + apellido : ''} y me gustaría contactarme con ustedes. ${mensaje}`;
      openWhatsApp(texto);
      contactForm.reset();
    });
  }

  // HEADER "RESERVAR AHORA" behavior:
  // if form has some info, open WhatsApp; otherwise scroll to booking form
  const heroReserveBtn = document.getElementById('heroReserveBtn');
  if (heroReserveBtn) {
    heroReserveBtn.addEventListener('click', () => {
      const checkin = document.getElementById('checkin')?.value || '';
      const checkout = document.getElementById('checkout')?.value || '';
      const personas = document.getElementById('personas')?.value || '';
      const habitacion = document.getElementById('habitacion')?.value || '';
      const numHabitaciones = document.getElementById('num_habitaciones')?.value || '';

      const hasInfo = checkin || checkout || personas || habitacion || numHabitaciones;
      if (hasInfo) {
        const mensaje = `Quiero agendar ${numHabitaciones ? numHabitaciones : '1'} habitación(es) - ${habitacion ? habitacion : 'Tipo no especificado'} - para ${personas ? personas : 'N° personas no especificado'} persona(s) del ${checkin ? checkin : 'fecha no especificada'} al ${checkout ? checkout : 'fecha no especificada'}.`;
        openWhatsApp(mensaje);
      } else {
        const bookingEl = document.getElementById('booking-form');
        if (bookingEl) {
          bookingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const firstInput = bookingEl.querySelector('input, select, textarea');
          if (firstInput) firstInput.focus({ preventScroll: true });
        } else {
          openWhatsApp('Hola, quiero reservar una habitación. ¿Me pueden ayudar?');
        }
      }
    });
  }

  // Buttons inside rooms to prefill type and open booking (inline reserve)
  document.querySelectorAll('.btn-reserve-inline').forEach(btn => {
    btn.addEventListener('click', ev => {
      const roomType = btn.getAttribute('data-room') || '';
      // Set the select and scroll to booking
      const habitacionEl = document.getElementById('habitacion');
      if (habitacionEl && roomType) habitacionEl.value = roomType;
      const bookingEl = document.getElementById('booking-form');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const firstInput = bookingEl.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus({ preventScroll: true });
      }
    });
  });

  // Reveal on scroll simple implementation
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => obs.observe(el));
  } else {
    // fallback: show all
    reveals.forEach(el => el.classList.add('visible'));
  }
});