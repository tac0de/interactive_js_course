const logo = document.getElementById('morphTarget');
const image = document.getElementById('logoImage');
const trigger = document.getElementById('logoEndTrigger');

let targetY = 0;
let startY = 0;

// Use IntersectionObserver for optional state detection
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    targetY = entry.boundingClientRect.top + window.scrollY;
  }
}, {
  root: null,
  threshold: 0
});
observer.observe(trigger);

// Animate on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const screenH = window.innerHeight;

  const progress = Math.min(scrollY / (targetY || screenH), 1);

  // Simulate 3D shrinking effect
  const scale = 1 - progress * 0.7;
  const rotateX = progress * 30;  // tilt forward
  const rotateY = progress * 20;  // slight turn
  const translateZ = -progress * 200;

  logo.style.transform = `
    translate(-50%, -50%)
    scale(${scale})
    perspective(1200px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(${translateZ}px)
  `;

  // Optional: dim glow as it shrinks
  const glowOpacity = 1 - progress;
  image.style.filter = `drop-shadow(0 0 ${40 * glowOpacity}px rgba(0,255,255,${0.4 * glowOpacity}))`;
});
