(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // código de barras decorativo (determinístico, a partir do @ do perfil)
  const seed = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => (h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296; };
  const draw = (id, h) => {
    const g = document.getElementById(id); if (!g) return;
    const r = seed('dra.jaquelineguimaraes'); let x = 12, out = '';
    while (x < 206) { const w = 1 + Math.floor(r() * 3.2); if (r() > .38) out += `<rect x="${x}" y="6" width="${w}" height="${h}"/>`; x += w + 1 + Math.floor(r() * 2); }
    g.innerHTML = out;
  };
  draw('bars', 40); draw('bars2', 52);

  // revelação por seção
  const rv = [...document.querySelectorAll('.rv')];
  const stamps = document.querySelector('.stamps');
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(e => e.classList.add('in')); stamps && stamps.classList.add('in');
  } else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(e => io.observe(e));
    if (stamps) new IntersectionObserver(([e], o) => { if (e.isIntersecting) { stamps.classList.add('in'); o.disconnect(); } }, { threshold: .35 }).observe(stamps);
  }

  // CTA fixo no celular depois da capa
  const float = document.querySelector('[data-float]');
  const cover = document.querySelector('.cover');
  const back = document.querySelector('#contracapa');
  if (float && 'IntersectionObserver' in window) {
    let past = false, atBack = false;
    const upd = () => float.classList.toggle('show', past && !atBack);
    new IntersectionObserver(([e]) => { past = !e.isIntersecting; upd(); }).observe(cover);
    new IntersectionObserver(([e]) => { atBack = e.isIntersecting; upd(); }, { threshold: .2 }).observe(back);
  }
})();
