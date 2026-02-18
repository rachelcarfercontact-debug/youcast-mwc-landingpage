/* ========================================
   YOUCAST × IQUALL NETWORKS - COMPLETE JS
   MWC Barcelona 2026 Landing Page
   Formspree Integration
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // LOADING SCREEN
  // ========================================
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const loadingVideo = document.getElementById('loading-video');
  
  let isLoading = true;
  const minLoadTime = 1200;
  const startTime = Date.now();
  
  function hideLoading() {
    if (!isLoading) return;
    isLoading = false;
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);
    
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      mainContent.classList.add('visible');
      setTimeout(() => {
        navbar.classList.add('loaded');
      }, 100);
    }, remainingTime);
  }
  
  if (loadingVideo) {
    loadingVideo.addEventListener('ended', hideLoading);
    loadingVideo.addEventListener('error', () => {
      setTimeout(hideLoading, 1000);
    });
  }
  
  setTimeout(hideLoading, 3000);
  
  // ========================================
  // NAVIGATION BAR
  // ========================================
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  let isMobileMenuOpen = false;
  
  mobileMenuBtn.addEventListener('click', () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      isMobileMenuOpen = false;
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
  
  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.dataset.delay || 0;
        const duration = element.dataset.duration || 0.5;
        element.style.transitionDuration = `${duration}s`;
        element.style.transitionDelay = `${delay}s`;
        element.classList.add('visible');
        revealObserver.unobserve(element);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });
  
  scrollRevealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // ========================================
  // COUNTER ANIMATION
  // ========================================
  const metricValues = document.querySelectorAll('.metric-value');
  let countersAnimated = false;
  
  function animateCounter(element) {
    const target = parseInt(element.dataset.target) || 0;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);
      element.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    requestAnimationFrame(updateCounter);
  }
  
  const metricsSection = document.querySelector('.resultados-section');
  if (metricsSection) {
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          metricValues.forEach(element => animateCounter(element));
          metricsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    metricsObserver.observe(metricsSection);
  }
  
  // ========================================
  // CAROUSEL
  // ========================================
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (carouselTrack && prevBtn && nextBtn) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    let slidesPerView = 1;
    
    function updateSlidesPerView() {
      if (window.innerWidth >= 1024) {
        slidesPerView = 3;
      } else if (window.innerWidth >= 640) {
        slidesPerView = 2;
      } else {
        slidesPerView = 1;
      }
    }
    
    function updateCarousel() {
      const slideWidth = 100 / slidesPerView;
      carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
    
    function nextSlide() {
      updateSlidesPerView();
      const maxIndex = slides.length - slidesPerView;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }
    
    function prevSlide() {
      updateSlidesPerView();
      const maxIndex = slides.length - slidesPerView;
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000);
    
    window.addEventListener('resize', () => {
      updateSlidesPerView();
      updateCarousel();
    });
    updateSlidesPerView();
  }
  
  // ========================================
  // FAQ ACCORDION
  // ========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    });
  });
  
  // ========================================
  // FLOATING BADGE
  // ========================================
  const estandeImage = document.getElementById('estande-image');
  const floatingBadge = document.getElementById('floating-badge');
  
  if (estandeImage && floatingBadge) {
    estandeImage.addEventListener('mouseenter', () => {
      floatingBadge.classList.remove('hidden');
    });
    estandeImage.addEventListener('mouseleave', () => {
      floatingBadge.classList.add('hidden');
    });
    estandeImage.addEventListener('mousemove', (e) => {
      floatingBadge.style.left = e.clientX + 'px';
      floatingBadge.style.top = e.clientY + 'px';
    });
  }
  
  // ========================================
  // FORM HANDLING - FORMSPREE
  // ========================================
  const form = document.getElementById('agendamento-form');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const submitText = document.getElementById('submit-text');
  const newBookingBtn = document.getElementById('new-booking-btn');

  // ╔══════════════════════════════════════╗
  // ║  COLE SEU ENDPOINT DO FORMSPREE AQUI ║
  // ╚══════════════════════════════════════╝
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkovzbbn';

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      
      const autorizado = document.getElementById('autorizado').checked;
      if (!autorizado) {
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'Por favor, autorize o contato para continuar.';
        return;
      }
      
      errorMessage.classList.add('hidden');
      submitText.textContent = 'Enviando...';
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      
      try {
        const data = {
          nome: formData.get('nome'),
          empresa: formData.get('empresa'),
          cargo: formData.get('cargo'),
          email: formData.get('email'),
          telefone: formData.get('telefone'),
          demonstracoes: formData.getAll('demonstracoes').join(', '),
          desafios: formData.get('desafios'),
          autorizado: 'Sim'
        };
        
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          form.classList.add('hidden');
          successMessage.classList.remove('hidden');
          form.reset();
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'Ocorreu um erro ao enviar. Por favor, tente novamente.';
      } finally {
        submitText.textContent = 'Confirmar agendamento';
        submitBtn.disabled = false;
      }
    });
    
    if (newBookingBtn) {
      newBookingBtn.addEventListener('click', () => {
        form.reset();
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
      });
    }
  }
  
  // ========================================
  // SMOOTH SCROLL
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top on load
  window.scrollTo(0, 0);
  
});