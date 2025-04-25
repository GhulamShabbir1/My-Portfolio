var typed=new Typed(".texts", {
  strings:["Software Engineer","A Learner " ,"MERN Stack Developer "],
  typeSpeed:100,
  backspeed:100,
  backdelay:1000,
  loop:true
});


document.addEventListener('DOMContentLoaded', function() {
  // 1. Testimonials carousel fix
  const initTestimonials = () => {
    const container = document.querySelector('.testimonials-container');
    if (container) {
      const cardCount = document.querySelectorAll('.testimonial-card').length;
      container.style.width = `${cardCount * 100}%`;
    }
  };

  // 2. Circular skills animation
  const initCircularSkills = () => {
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

  // 3. Verify Font Awesome
  const checkIcons = () => {
    const icons = document.querySelectorAll('.fa, [class^="fa-"]');
    if (icons.length === 0 || !Array.from(document.styleSheets).some(sheet => sheet.href && sheet.href.includes('font-awesome'))) {
      console.warn('Font Awesome not loaded, applying fallback.');
      const faCSS = document.createElement('link');
      faCSS.rel = 'stylesheet';
      faCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
      document.head.appendChild(faCSS);
    }
  };

  // Initialize functions
  initTestimonials();
  initCircularSkills();
  checkIcons();
});
