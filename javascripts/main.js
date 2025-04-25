document.addEventListener('DOMContentLoaded', function() {
  // Debugging helpers (for development only)
  const debugElements = () => {
    console.log("Current Opacities:", {
      title: getComputedStyle(document.querySelector('.hero-title')).opacity,
      subtitle: getComputedStyle(document.querySelector('.hero-subtitle')).opacity,
      button: getComputedStyle(document.querySelector('.cta-button')).opacity
    });
    console.log('Nav links:', document.querySelectorAll('.nav-links a'));
    console.log('Font Awesome loaded:', document.querySelector('link[href*="font-awesome"]') ? 'Yes' : 'No');
  };

  // Initialize GSAP
  const initGSAP = () => {
    if (window.gsap) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1
      });
      return true;
    }
    return false;
  };

  // GSAP fallback loader
  const loadLocalGSAP = () => {
    const gsapScript = document.createElement('script');
    gsapScript.src = '/js/gsap.min.js';
    gsapScript.onload = () => {
      if (initGSAP()) {
        console.log('GSAP loaded locally');
      }
    };
    document.head.appendChild(gsapScript);
  };

  // Font Awesome fallback loader
  const loadLocalFontAwesome = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/font-awesome/all.css';
    document.head.appendChild(link);
    link.onerror = () => {
      console.error('Failed to load Font Awesome');
      document.documentElement.classList.add('no-font-awesome');
    };
  };

  // Mobile menu functionality
  const setupMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        gsap.to(menuToggle, {
          rotation: navLinks.classList.contains('active') ? 90 : 0,
          duration: 0.3
        });
      });
    }
  };

  // Safe code execution helper
  const safeCodeExecution = (codeString) => {
    try {
      return new Function('"use strict"; return (' + codeString + ')')();
    } catch (e) {
      console.error('Code execution failed:', e);
      return null;
    }
  };

  // Ensure navbar is visible
  const ensureNavbarVisible = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.transform = 'none';
      navbar.style.opacity = '1';
    }
  };

  // Testimonials carousel initialization
  const initTestimonialsCarousel = () => {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;
    
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => updateCarousel(index));
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    const updateCarousel = (index) => {
      currentIndex = index;
      testimonialsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
    };

    nextBtn.addEventListener('click', () => updateCarousel((currentIndex + 1) % testimonialCards.length));
    prevBtn.addEventListener('click', () => updateCarousel((currentIndex - 1 + testimonialCards.length) % testimonialCards.length));

    let autoSlide = setInterval(() => updateCarousel((currentIndex + 1) % testimonialCards.length), 5000);
    
    testimonialsContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    testimonialsContainer.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => updateCarousel((currentIndex + 1) % testimonialCards.length), 5000);
    });

    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out"
          });
        }
      });
    });
  };

  // Contact form submission handler
  const handleContactFormSubmission = () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.message) {
          showFormMessage('Please fill in all required fields', 'error');
          return;
        }

        setTimeout(() => {
          contactForm.reset();
          showFormMessage('Your message has been sent successfully!', 'success');
        }, 1000);
      });
    }

    function showFormMessage(message, type) {
      formMessage.textContent = message;
      formMessage.className = 'form-message ' + type;
      setTimeout(() => formMessage.style.opacity = '0', 5000);
    }
  };

  // Circular skills animation
  const animateCircularSkills = () => {
    document.querySelectorAll('.skill-circle').forEach(circle => {
      const percent = circle.dataset.percent;
      const fill = circle.querySelector('.circle-fill');
      const number = circle.querySelector('.percent-number');

      gsap.to(fill, {
        strokeDasharray: `${percent}, 100`,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 80%"
        }
      });

      gsap.to(number, {
        innerText: percent,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power3.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 80%"
        }
      });
    });
  };

  // Initialize everything
  const init = () => {
    ensureNavbarVisible();
    setupMobileMenu();
    initTestimonialsCarousel();
    handleContactFormSubmission();

    if (!initGSAP()) {
      console.warn('GSAP not loaded, attempting fallback');
      loadLocalGSAP();
    }
    
    if (!document.querySelector('link[href*="font-awesome"]')) {
      console.warn('Font Awesome not found, loading fallback');
      loadLocalFontAwesome();
    }
  };

  init();

  // Circular skills animation
  animateCircularSkills();

  // Debugging (remove in production)
  const debugInterval = setInterval(debugElements, 1000);
  window.addEventListener('beforeunload', () => clearInterval(debugInterval));
});

// Font Awesome icon check
document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.social-icon i');
  console.log('Font Awesome Icons:', icons.length > 0 ? 'Loaded' : 'Missing');

  icons.forEach(icon => {
    if (!icon.className.includes('fa-')) {
      console.error('Icon not rendered:', icon);
    }
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach(bar => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress;
    });
  });


  // Track CV downloads
document.querySelector('a[download]').addEventListener('click', function() {
  // You can add analytics here
  console.log('CV downloaded');
  
  // Or send data to your analytics platform
  // ga('send', 'event', 'Button', 'Download', 'CV');
});
