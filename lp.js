/* Progressive enhancement only: all content and application links work without JS. */
(() => {
  'use strict';
  const gallery = document.querySelector('.photo-gallery');
  if (gallery) {
    const track = gallery.querySelector('.gallery-track');
    const slides = [...track.querySelectorAll('.gallery-slide')];
    const previous = gallery.querySelector('.gallery-prev');
    const next = gallery.querySelector('.gallery-next');
    const count = gallery.querySelector('.gallery-count');
    previous.hidden = false;
    next.hidden = false;
    let index = 0;
    let frame;
    const offset = slide => slide.offsetLeft - slides[0].offsetLeft;
    const update = () => {
      const position = track.scrollLeft;
      index = slides.reduce((best, slide, i) => Math.abs(offset(slide) - position) < Math.abs(offset(slides[best]) - position) ? i : best, 0);
      previous.disabled = position < 2;
      next.disabled = position >= track.scrollWidth - track.clientWidth - 2;
      count.textContent = `${index + 1} / ${slides.length}`;
    };
    const move = step => track.scrollTo({left:offset(slides[Math.max(0, Math.min(slides.length - 1, index + step))]),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('scroll', () => {cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});
    track.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      move(event.key === 'Home' ? -slides.length : event.key === 'End' ? slides.length : event.key === 'ArrowLeft' ? -1 : 1);
    });
    new ResizeObserver(update).observe(track);
    update();
  }

  const dialog = document.querySelector('.photo-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('figcaption');
    let returnFocus;
    document.querySelectorAll('.gallery-open').forEach(anchor => anchor.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocus = anchor;
      image.src = anchor.href;
      image.alt = anchor.querySelector('img').alt;
      caption.textContent = anchor.closest('figure').querySelector('figcaption').textContent;
      dialog.showModal();
    }));
    dialog.querySelector('.photo-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {if(event.target === dialog)dialog.close();});
    dialog.addEventListener('close', () => {image.removeAttribute('src');returnFocus?.focus({preventScroll:true});});
  }

  const shortcut = document.querySelector('.mobile-cta');
  const hero = document.querySelector('.hero-stage');
  const finalSection = document.querySelector('.final-section');
  if (shortcut && hero && finalSection && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let finalVisible = false;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if(entry.target === hero)heroVisible=entry.isIntersecting;else finalVisible=entry.isIntersecting;});
      shortcut.hidden = heroVisible || finalVisible;
    });
    observer.observe(hero);
    observer.observe(finalSection);
  }
})();
