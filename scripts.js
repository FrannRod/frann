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
let phrases = [
  'Líder Técnico',
  'Apasionado por la tecnología',
  'Desarrollador de software',
  'Experto en IA'
];

if (tagline && tagline.dataset.phrases) {
  try {
    phrases = JSON.parse(tagline.dataset.phrases);
  } catch (e) {
    phrases = [tagline.textContent];
  }
}
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

// Mostrar lista secreta al tocar 3 veces el año del footer
document.addEventListener('DOMContentLoaded', () => {
  const hiddenList = document.getElementById('otros-invitados');
  const year = document.querySelector('footer p');
  if (hiddenList && year) {
    let taps = 0;
    let last = 0;
    year.addEventListener('click', () => {
      const now = Date.now();
      if (now - last > 800) {
        taps = 0;
      }
      taps++;
      last = now;
      if (taps >= 3) {
        hiddenList.style.display = hiddenList.style.display === 'none' ? 'block' : 'none';
        taps = 0;
      }
    });
  }
});
