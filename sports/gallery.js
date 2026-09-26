(() => {
  const gallery = document.querySelector('.photo-gallery');
  if (!gallery) return;
  const track = gallery.querySelector('.gallery-track');
  const slides = [...track.children];
  const prev = gallery.querySelector('.gallery-prev');
  const next = gallery.querySelector('.gallery-next');
  const count = gallery.querySelector('.gallery-count');
  let index = 0;
  let frame;
  const update = () => {
    index = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    count.textContent = `${index + 1} / ${slides.length}`;
    track.style.height = `${Math.ceil(slides[index].getBoundingClientRect().height) + (track.offsetHeight - track.clientHeight)}px`;
  };
  const move = (step) => {
    const target = Math.max(0, Math.min(slides.length - 1, index + step));
    track.scrollTo({left: target * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', (event) => {
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      move(event.key === 'Home' ? -slides.length : slides.length);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, {passive: true});
  let width = track.clientWidth;
  new ResizeObserver(() => {
    if (width !== track.clientWidth) {
      width = track.clientWidth;
      track.scrollTo({left: index * width, behavior: 'instant'});
      update();
    }
  }).observe(track);
  slides.forEach(slide => {
    new ResizeObserver(update).observe(slide);
  });
  update();
})();
