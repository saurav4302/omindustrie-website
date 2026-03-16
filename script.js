const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('.reveal');

const heroImage = document.getElementById('heroSliderImage');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const heroDots = document.getElementById('heroDots');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

const heroSlides = [
  { src: 'assets/images/hero-heatsink-primary.jpeg', alt: 'Featured OM Industries heat sink product' },
  { src: 'assets/images/heatsink-product-02.jpeg', alt: 'Extruded heat sink profile' },
  { src: 'assets/images/heatsink-product-09.jpeg', alt: 'Heavy-duty industrial heat sink' },
  { src: 'assets/images/heatsink-product-17.jpeg', alt: 'Precision machined heat sink' }
];

let currentHero = 0;
let heroTimer;
let currentLightboxIndex = 0;

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);
revealItems.forEach((item) => observer.observe(item));

const renderHeroDots = () => {
  if (!heroDots) return;
  heroDots.innerHTML = '';

  heroSlides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.classList.toggle('active', index === currentHero);
    dot.setAttribute('aria-label', `Show hero image ${index + 1}`);
    dot.addEventListener('click', () => {
      updateHero(index);
      restartHeroTimer();
    });
    heroDots.appendChild(dot);
  });
};

const updateHero = (index) => {
  if (!heroImage) return;
  currentHero = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[currentHero];
  heroImage.src = slide.src;
  heroImage.alt = slide.alt;
  renderHeroDots();
  syncZoomableList();
};

const nextHero = () => updateHero(currentHero + 1);
const prevHero = () => updateHero(currentHero - 1);

const startHeroTimer = () => {
  heroTimer = window.setInterval(nextHero, 3500);
};

const restartHeroTimer = () => {
  window.clearInterval(heroTimer);
  startHeroTimer();
};

heroNext?.addEventListener('click', () => {
  nextHero();
  restartHeroTimer();
});

heroPrev?.addEventListener('click', () => {
  prevHero();
  restartHeroTimer();
});

renderHeroDots();
startHeroTimer();

const applyFilter = (filter) => {
  galleryItems.forEach((item) => {
    const category = item.dataset.category;
    const show = filter === 'all' || category === filter;
    item.classList.toggle('hidden', !show);
  });
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    applyFilter(filter);
    syncZoomableList();
  });
});

let zoomable = [];
const syncZoomableList = () => {
  zoomable = Array.from(document.querySelectorAll('.zoomable')).filter((img) => {
    return img.offsetParent !== null;
  });
};
syncZoomableList();

const openLightbox = (index) => {
  if (!lightbox || !lightboxImage || !lightboxCaption || !zoomable.length) {
    return;
  }

  currentLightboxIndex = (index + zoomable.length) % zoomable.length;
  const selectedImage = zoomable[currentLightboxIndex];
  lightboxImage.src = selectedImage.src;
  lightboxImage.alt = selectedImage.alt;
  lightboxCaption.textContent = selectedImage.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.addEventListener('click', (event) => {
  const imageTarget = event.target.closest('.zoomable');
  if (imageTarget) {
    syncZoomableList();
    const index = zoomable.indexOf(imageTarget);
    if (index >= 0) {
      openLightbox(index);
    }
    return;
  }

  const ctaTarget = event.target.closest('.img-cta');
  if (ctaTarget) {
    const image = ctaTarget.parentElement?.querySelector('.zoomable');
    if (!image) return;
    syncZoomableList();
    const index = zoomable.indexOf(image);
    if (index >= 0) {
      openLightbox(index);
    }
  }
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => openLightbox(currentLightboxIndex - 1));
lightboxNext?.addEventListener('click', () => openLightbox(currentLightboxIndex + 1));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('open')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') openLightbox(currentLightboxIndex - 1);
  if (event.key === 'ArrowRight') openLightbox(currentLightboxIndex + 1);
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
