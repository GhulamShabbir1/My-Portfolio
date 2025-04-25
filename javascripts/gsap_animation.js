(function() {
  // Debug element selection
  console.log('Hero Subtitle Element:', document.querySelector('.hero-subtitle'));
  console.log('CTA Button Element:', document.querySelector('.cta-button'));

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ===== NETWORK BACKGROUND ANIMATION =====
  function createNetworkAnimation() {
    const colors = ['#ff4d4d', '#f9cb28', '#00ffff', '#9d4dff', '#4dff88'];
    const container = document.querySelector('.gradient-bg');
    const nodes = [];
    
    // Create network nodes
    for (let i = 0; i < 30; i++) {
      const node = document.createElement('div');
      node.className = 'network-node';
      node.style.width = node.style.height = `${Math.random() * 6 + 4}px`;
      node.style.background = colors[Math.floor(Math.random() * colors.length)];
      node.style.left = `${Math.random() * 100}%`;
      node.style.top = `${Math.random() * 100}%`;
      container.appendChild(node);
      nodes.push(node);
    }

    // Animate nodes
    nodes.forEach(node => {
      // Initial animation
      gsap.to(node, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-50, 50),
        duration: gsap.utils.random(5, 15),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Pulsing effect
      gsap.to(node, {
        scale: gsap.utils.random(0.8, 1.2),
        opacity: gsap.utils.random(0.7, 1),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });

    // Create connections
    function updateConnections() {
      const lines = document.querySelectorAll('.network-line');
      lines.forEach(line => line.remove());

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[i].offsetLeft - nodes[j].offsetLeft, 2) + 
            Math.pow(nodes[i].offsetTop - nodes[j].offsetTop, 2)
          );
          
          if (distance < 150) {
            const line = document.createElement('div');
            line.className = 'network-line';
            container.appendChild(line);
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            gsap.set(line, {
              background: `linear-gradient(90deg, ${color}, transparent)`,
              width: distance,
              left: nodes[i].offsetLeft,
              top: nodes[i].offsetTop,
              rotation: Math.atan2(
                nodes[j].offsetTop - nodes[i].offsetTop,
                nodes[j].offsetLeft - nodes[i].offsetLeft
              ) * (180 / Math.PI),
              opacity: 1 - distance/150
            });
          }
        }
      }
    }

    // Update connections periodically
    gsap.ticker.add(updateConnections);
  }

  // ===== MAIN ANIMATIONS =====
  // Gradient background animation
  gsap.to(".gradient-bg", {
    backgroundPosition: "100% 50%",
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: "linear",
    onStart: createNetworkAnimation
  });

  // Create master timeline
  const masterTimeline = gsap.timeline({
    defaults: { 
      ease: "power3.out",
      opacity: 1
    }
  });

 

  // Final safety check
  masterTimeline.eventCallback("onComplete", () => {
    gsap.set([".hero-title", ".hero-subtitle", ".cta-button"], { opacity: 1 });
    console.log("All animations completed successfully");
  });
})();

// About section animation
gsap.from(".about-content", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2
});

// Personal info items animation
gsap.from(".info-item", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 60%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  stagger: 0.15
});

// Animate technical skill bars
gsap.utils.toArray('.skill-progress').forEach(progress => {
  ScrollTrigger.create({
    trigger: progress,
    start: "top 80%",
    onEnter: () => {
      gsap.to(progress, {
        width: progress.dataset.width + '%',
        duration: 1.5,
        ease: "power3.out"
      });
    }
  });
});

// Animate circular skills
gsap.utils.toArray('.skill-circle').forEach(circle => {
  const percent = circle.dataset.percent;
  circle.style.setProperty('--percent', percent + '%');
  
  ScrollTrigger.create({
    trigger: circle,
    start: "top 80%",
    onEnter: () => {
      gsap.from(circle, {
        '--percent': '0%',
        duration: 1.5,
        ease: "power3.out"
      });
    }
  });
});

// About section image animation
gsap.from(".profile-img", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%"
  },
  scale: 0.5,
  opacity: 0,
  duration: 1,
  ease: "back.out"
});



// Animate technical skill bars
gsap.utils.toArray('.skill-progress').forEach(progress => {
  ScrollTrigger.create({
    trigger: progress,
    start: "top 80%",
    onEnter: () => {
      gsap.to(progress, {
        width: progress.dataset.width + '%',
        duration: 1.5,
        ease: "power3.out"
      });
    }
  });
});

// Animate circular skills with percentage counting
gsap.utils.toArray('.skill-circle').forEach(circle => {
  const percent = circle.dataset.percent;
  const fillPath = circle.querySelector('.circle-fill');
  const percentNumber = circle.querySelector('.percent-number');
  
  // Set the stroke dasharray for the circle
  const circumference = 2 * Math.PI * 15.9155; // 2πr
  const dashValue = (percent / 100) * circumference;
  
  ScrollTrigger.create({
    trigger: circle,
    start: "top 80%",
    onEnter: () => {
      // Animate the circle fill
      gsap.to(fillPath, {
        strokeDasharray: `${dashValue}, ${circumference}`,
        duration: 1.5,
        ease: "power3.out"
      });
      
      // Animate the percentage number
      gsap.to({
        val: 0
      }, {
        val: percent,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: function() {
          percentNumber.textContent = Math.floor(this.val) + "%";
        }
      });
    }
  });
});


// Projects Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.dataset.filter;
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            display: 'block'
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            display: 'none'
          });
        }
      });
    });
  });
  
  // Animate projects on scroll
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.1,
          ease: "back.out"
        });
      }
    });
  });
});


// In your gsap-animations.js
function initProjectAnimations() {
  // Project cards stagger animation
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: "#projects",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
  });
  
  // Filter buttons animation
  gsap.from(".filter-btn", {
    scrollTrigger: {
      trigger: "#projects",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out"
  });
}


function initTestimonialAnimations() {
  // Testimonials section entrance
  gsap.from("#testimonials .section-title", {
    scrollTrigger: {
      trigger: "#testimonials",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out"
  });
  
  // Navigation buttons animation
  gsap.from(".testimonials-nav", {
    scrollTrigger: {
      trigger: "#testimonials",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out"
  });
}

function initContactAnimations() {
  // Contact section title
  gsap.from("#contact .section-title", {
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out"
  });
}