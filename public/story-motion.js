// Native scrolling with a short, frame-rate-independent easing tail.
(() => {
  const section = document.querySelector('.market-story');
  if (!section) return;
  const track = section.querySelector('.market-story-scroll');
  const stage = section.querySelector('.market-story-stage');
  const chapters = [...section.querySelectorAll('[data-story-chapter]')];
  const header = document.querySelector('header');
  const motion = matchMedia('(min-height: 480px) and (prefers-reduced-motion: no-preference)');
  let frame = 0, current = -1, visible = true, position = null, lastTime = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => value * value * (3 - 2 * value);
  function target() {
    const rect = track.getBoundingClientRect();
    const travel = Math.max(1, rect.height - stage.offsetHeight);
    return clamp(((header?.offsetHeight ?? 64) - rect.top) / travel) * (chapters.length - 1);
  }
  function paint(progress) {
    const index = Math.min(chapters.length - 2, Math.floor(progress));
    // A broad transition window keeps trackpad and touch movement gentle.
    const blend = smooth(clamp((progress - index - .22) / .78));
    const active = blend < .5 ? index : index + 1;
    chapters.forEach((chapter, i) => {
      const opacity = i === index ? 1 - blend : i === index + 1 ? blend : 0;
      const shift = i === index ? -blend : i === index + 1 ? 1 - blend : 0;
      chapter.style.setProperty('--story-opacity', opacity.toFixed(4));
      chapter.style.setProperty('--story-shift', `${shift * 22}px`);
      chapter.style.setProperty('--story-scale', (1 - Math.abs(shift) * .015).toFixed(4));
      chapter.inert = i !== active;
      chapter.setAttribute('aria-hidden', String(i !== active));
    });
    section.style.setProperty('--story-cool', index === 0 ? blend.toFixed(4) : (1 - blend).toFixed(4));
    if (active !== current) { section.dataset.chapter = String(active); current = active; }
  }
  function update(time) {
    frame = 0;
    if (!motion.matches || document.hidden || !visible) { lastTime = 0; return; }
    const goal = target();
    const dt = lastTime ? Math.min(64, Math.max(1, time - lastTime)) : 16;
    lastTime = time;
    position = position === null ? goal : position + (goal - position) * (1 - Math.exp(-dt / 85));
    if (Math.abs(goal - position) < .0008) position = goal;
    paint(position);
    if (position !== goal) frame = requestAnimationFrame(update);
    else lastTime = 0;
  }
  function queue() {
    if (motion.matches && visible && !document.hidden && !frame) frame = requestAnimationFrame(update);
  }
  function configure() {
    cancelAnimationFrame(frame); frame = 0; current = -1; position = null; lastTime = 0;
    section.classList.toggle('story-animated', motion.matches);
    chapters.forEach(chapter => { chapter.inert = false; chapter.removeAttribute('aria-hidden'); chapter.removeAttribute('style'); });
    if (motion.matches) { visible = true; position = target(); paint(position); }
    else section.style.removeProperty('--story-cool');
  }
  addEventListener('scroll', queue, {passive: true});
  addEventListener('resize', queue, {passive: true});
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; } else queue(); });
  motion.addEventListener('change', configure);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) { position = null; queue(); }
  }, {rootMargin: '100px'}).observe(track);
  configure();
})();
