(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }));
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('[data-slide]')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let timer;
    let paused = reduceMotion;
    let inView = true;
    const canPlay = () => !paused && !document.hidden && inView;
    const schedule = () => {
      window.clearTimeout(timer);
      if (paused || document.hidden || !inView) return;
      const video = slides[index].querySelector('video');
      if (video) {
        video.muted = true;
        if (!video.getAttribute('src')) video.src = video.dataset.src;
        video.play().catch(() => {});
        // Advance even if autoplay is blocked or a media request fails.
        timer = window.setTimeout(() => show(index + 1), 30000);
      } else {
        timer = window.setTimeout(() => show(index + 1), 5500);
      }
    };
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const wasActive = slide.classList.contains('active');
        slide.classList.toggle('outgoing', wasActive && i !== index);
        slide.classList.toggle('active', i === index);
        slide.setAttribute('aria-hidden', String(i !== index));
        const video = slide.querySelector('video');
        if (video && i !== index) {
          video.pause();
          if (!wasActive) video.currentTime = 0;
        }
      });
      schedule();
    };
    const stop = () => {
      window.clearTimeout(timer);
      slides[index]?.querySelector('video')?.pause();
    };
    slides.forEach((slide, i) => slide.querySelector('video')?.addEventListener('ended', () => { if (i === index && canPlay()) show(index + 1); }));
    slides.forEach(slide => slide.addEventListener('transitionend', event => {
      if (event.target === slide && event.propertyName === 'opacity' && !slide.classList.contains('active')) {
        slide.classList.remove('outgoing');
        const video = slide.querySelector('video');
        if (video) video.currentTime = 0;
      }
    }));
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
      if (event.code === 'Space') { event.preventDefault(); paused = !paused; if (paused) stop(); else schedule(); }
    });
    let touchStart;
    carousel.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', event => {
      const distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1));
    }, { passive: true });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : schedule());
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (inView) schedule(); else stop();
    }, { threshold: 0.2 }).observe(carousel);
    show(0);
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }
})();
