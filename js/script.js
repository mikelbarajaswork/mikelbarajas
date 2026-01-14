// Inicializar AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// Navegación móvil
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Smooth scroll para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header scroll effect
/*
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    // Scroll Down
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    // Scroll Up
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});
*/

// Funcionalidad para los desplegables de módulos
document.addEventListener('DOMContentLoaded', function() {
  const moduloHeaders = document.querySelectorAll('.modulo-header');
  
  moduloHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const moduloItem = header.parentElement;
      const isActive = moduloItem.classList.contains('active');
      
      // Cerrar todos los módulos
      document.querySelectorAll('.modulo-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Si el módulo no estaba activo, lo abrimos
      if (!isActive) {
        moduloItem.classList.add('active');
      }
    });
  });
});

// Funcionalidad del Modal
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('proyecto-modal');
  const btn = document.getElementById('saber-mas-btn');
  const closeBtn = document.getElementsByClassName('close')[0];

  // Abrir modal al hacer clic en "Saber más"
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    });
  }

  // Cerrar modal al hacer clic en la X
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restaurar scroll del body
    });
  }

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
  });

  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
  });
});

// Efectos dinámicos para la sección de formación
document.addEventListener('DOMContentLoaded', function() {
  // Animación de entrada escalonada para los elementos del timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Función para animar elementos cuando entran en viewport
  function animateOnScroll() {
    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !item.classList.contains('animated')) {
        item.classList.add('animated');
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animation = 'slideInUp 0.6s ease forwards';
      }
    });
  }

  // Efecto de parallax suave para el timeline (solo en desktop)
  function parallaxEffect() {
    if (window.innerWidth > 768) {
      const timeline = document.querySelector('.timeline');
      if (timeline) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        timeline.style.transform = `translateY(${rate}px)`;
      }
    }
  }

  // Efecto de hover mejorado para timeline items (solo en desktop)
  if (window.innerWidth > 768) {
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 15px 35px rgba(0, 102, 255, 0.15)';
      });

      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
      });
    });
  }

  // Efecto de click con ripple para todos los dispositivos
  timelineItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Efecto de pulso para el botón timeline (solo en desktop)
  if (window.innerWidth > 768) {
    const timelineBtn = document.querySelector('.btn-timeline');
    if (timelineBtn) {
      setInterval(() => {
        timelineBtn.style.animation = 'pulse 2s ease-in-out';
        setTimeout(() => {
          timelineBtn.style.animation = '';
        }, 2000);
      }, 5000);
    }
  }

  // Event listeners
  window.addEventListener('scroll', () => {
    animateOnScroll();
    parallaxEffect();
  });

  // Inicializar animaciones
  animateOnScroll();
});

// Efectos dinámicos generales
document.addEventListener('DOMContentLoaded', function() {
  // Efecto de escritura para títulos
  const titles = document.querySelectorAll('h1, h2');
  titles.forEach(title => {
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '0';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        title.style.opacity = '1';
      }
    };
    
    // Iniciar efecto cuando el elemento es visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(title);
  });

  // Efecto de partículas flotantes
  function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(0, 102, 255, 0.3);
        border-radius: 50%;
        animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // Crear partículas solo en desktop
  if (window.innerWidth > 768) {
    createFloatingParticles();
  }
});

// Efectos de scroll desde laterales
document.addEventListener('DOMContentLoaded', function() {
  const scrollElements = document.querySelectorAll('.scroll-from-left, .scroll-from-right, .scroll-from-top, .scroll-from-bottom');
  
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('animate');
  };
  
  const hideScrollElement = (element) => {
    element.classList.remove('animate');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else {
        // Opcional: remover animación al salir del viewport
        // hideScrollElement(el);
      }
    });
  };
  
  // Throttle function para optimizar rendimiento
  const throttle = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Event listener con throttle
  window.addEventListener('scroll', throttle(handleScrollAnimation, 100));
  
// Ejecutar una vez al cargar la página
handleScrollAnimation();
});

// Funcionalidad para secciones desplegables
document.addEventListener('DOMContentLoaded', function() {
  const expandableSections = document.querySelectorAll('.expandable-section');
  
  expandableSections.forEach(section => {
    const header = section.querySelector('.expandable-header');
    const content = section.querySelector('.expandable-content');
    
    header.addEventListener('click', function() {
      section.classList.toggle('active');
      
      // Animación suave del contenido
      if (section.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
});
