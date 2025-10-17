document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }

  const reservaForm = document.getElementById('reservaForm');
  reservaForm.addEventListener('submit', e => {
    e.preventDefault();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const personas = document.getElementById('personas').value;
    const habitacion = document.getElementById('habitacion').value;

    const mensaje = `Hola, quiero reservar una ${habitacion} del ${checkin} al ${checkout} para ${personas} personas.`;
    window.open(`https://wa.me/524778510780?text=${encodeURIComponent(mensaje)}`, '_blank');
  });

  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const checkin = document.getElementById('checkin_contact').value;
    const checkout = document.getElementById('checkout_contact').value;
    const personas = document.getElementById('personas_contact').value;
    const habitacion = document.getElementById('habitacion_contact').value;
    const mensaje = document.getElementById('mensaje').value;

    const texto = `Hola, mi nombre es ${nombre}, mi correo es ${correo}. Quiero reservar una ${habitacion} del ${checkin} al ${checkout} para ${personas} personas. Mensaje adicional: ${mensaje}`;
    window.open(`https://wa.me/524778510780?text=${encodeURIComponent(texto)}`, '_blank');
    contactForm.reset();
  });
});