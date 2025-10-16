// Inicializa iconos Lucide
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

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Scroll suave para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Animación Reveal on Scroll
const revealEls = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window && revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('reveal-visible');
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => obs.observe(el));
}

// Hover dinámico para tarjetas, botones, imágenes
document.querySelectorAll('.cta-button, .gold-border, .group img').forEach(el => {
  el.addEventListener('mouseenter', () => el.classList.add('hover-scale'));
  el.addEventListener('mouseleave', () => el.classList.remove('hover-scale'));
});

// Crea botón de WhatsApp flotante
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/524771234567?text=Me%20gustaria%20agendar%20una%20cita%20en%20el%20Hotel%20Brisa%20del%20Baj%C3%ADo';
whatsappBtn.target = '_blank';
whatsappBtn.innerHTML = '<i data-lucide="message-circle"></i>';
whatsappBtn.className = 'fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center';
document.body.appendChild(whatsappBtn);

// Inicializa iconos Lucide para WhatsApp
lucide.createIcons();
