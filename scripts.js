// Add fade-in effect for sections when they come into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(section => {
  observer.observe(section);
});

// Simple typewriter effect for the tagline
const tagline = document.querySelector('.tagline');
const phrases = [
  'Líder Técnico',
  'Apasionado por la tecnología',
  'Desarrollador de software'
];
let phraseIndex = 0;
let charIndex = 0;
let removing = false;

function type() {
  const current = phrases[phraseIndex];
  tagline.textContent = current.substring(0, charIndex);
  if (!removing && charIndex <= current.length) {
    charIndex++;
    if (charIndex === current.length + 1) {
      removing = true;
      setTimeout(type, 1800);
      return;
    }
  } else if (removing && charIndex >= 0) {
    charIndex--;
    if (charIndex === 0) {
      removing = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, removing ? 50 : 100);
}

if (tagline) type();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-to-top button functionality
const toTop = document.getElementById('to-top');
if (toTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
