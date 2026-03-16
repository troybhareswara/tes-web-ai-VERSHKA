/* =============================================
   VERSHKA — FASHION LANDING PAGE
   JavaScript Interactions
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── PRELOADER ───────────────────────────────
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800);
  });
  document.body.style.overflow = 'hidden';


  // ─── CUSTOM CURSOR ───────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll(
    'a, button, .cat-card, .product-card, .sale-card, .look-item, input'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });


  // ─── NAVBAR SCROLL ───────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });


  // ─── MOBILE MENU ─────────────────────────────
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenuFn() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  closeMenu.addEventListener('click', closeMenuFn);
  menuOverlay.addEventListener('click', closeMenuFn);

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenuFn);
  });


  // ─── HERO SLIDER ─────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideTimer;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function autoSlide() {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => {
      goToSlide(currentSlide + 1);
      autoSlide();
    }, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      autoSlide();
    });
  });

  autoSlide();


  // ─── SCROLL REVEAL ───────────────────────────
  const revealEls = document.querySelectorAll(
    '.section-header, .cat-card, .product-card, .look-item, .sale-card, .sale-text, .newsletter-inner, .footer-top, .promo-content'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animations within grids
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ─── QUICK VIEW MODAL ────────────────────────
  const modal = document.getElementById('quick-modal');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalClose = modal.querySelector('.modal-close');
  const modalName = modal.querySelector('.modal-name');
  const modalPrice = modal.querySelector('.modal-price');
  const modalImg = modal.querySelector('.modal-img');

  // Image mapping for quick view
  const productImages = {
    'Floral Wrap Dress': 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    'Oversized Cargo Jacket': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    'Ribbed Crop Top': 'https://images.unsplash.com/photo-1554412933-514a83d2f3cc?w=600&q=80',
    'Slim Fit Chinos': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
  };

  document.querySelectorAll('.btn-quickview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      modalName.textContent = name;
      modalPrice.textContent = price;
      const imgUrl = productImages[name] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80';
      modalImg.style.backgroundImage = `url('${imgUrl}')`;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Size selection
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-options').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Add to cart (modal)
  modal.querySelector('.btn-primary').addEventListener('click', () => {
    const name = modalName.textContent;
    closeModal();
    showToast(`"${name}" ditambahkan ke keranjang!`);
  });

  // Wishlist (modal)
  modal.querySelector('.btn-outline').addEventListener('click', () => {
    const name = modalName.textContent;
    closeModal();
    showToast(`"${name}" ditambahkan ke wishlist ♡`);
  });


  // ─── WISHLIST BUTTONS ────────────────────────
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.textContent === '♥';
      btn.textContent = isActive ? '♡' : '♥';
      btn.style.color = isActive ? '' : '#c9a96e';
      if (!isActive) showToast('Ditambahkan ke wishlist ♥');
    });
  });


  // ─── TOAST NOTIFICATION ──────────────────────
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }


  // ─── NEWSLETTER FORM ─────────────────────────
  const nlForm = document.getElementById('nl-form');
  nlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = nlForm.querySelector('input').value;
    nlForm.querySelector('input').value = '';
    showToast(`Terima kasih! ${email} telah terdaftar 🎉`);
  });


  // ─── PARALLAX HERO BG ────────────────────────
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBgs = document.querySelectorAll('.hero-bg');
    heroBgs.forEach(bg => {
      bg.style.transform = `scale(1.05) translateY(${scrollY * 0.25}px)`;
    });
  });


  // ─── SMOOTH ANCHOR SCROLL ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ─── LOOKBOOK HOVER TEXT ──────────────────────
  document.querySelectorAll('.look-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.look-label').style.background = 'rgba(201,169,110,0.7)';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.look-label').style.background = 'rgba(0,0,0,0.3)';
    });
  });

});