/* ============================================================
   ISABELA & VITOR HUGO — script.js
   ============================================================ */

/* ---- Contador de namoro ---- */

const INICIO = new Date('2025-12-13T00:00:00');

function atualizarContador() {
  const agora = new Date();
  const diff  = agora - INICIO;

  if (diff < 0) return;

  const totalSeg  = Math.floor(diff / 1000);
  const totalMin  = Math.floor(totalSeg  / 60);
  const totalHora = Math.floor(totalMin  / 60);
  const totalDias = Math.floor(totalHora / 24);

  const seg   = totalSeg  % 60;
  const min   = totalMin  % 60;
  const horas = totalHora % 24;

  /* Cálculo de anos e meses completos */
  let anos  = agora.getFullYear() - INICIO.getFullYear();
  let meses = agora.getMonth()    - INICIO.getMonth();

  if (meses < 0) {
    anos  -= 1;
    meses += 12;
  }

  /* Dias restantes após os meses completos */
  const baseRef = new Date(INICIO);
  baseRef.setFullYear(baseRef.getFullYear() + anos);
  baseRef.setMonth(baseRef.getMonth() + meses);
  const diasRestantes = Math.floor((agora - baseRef) / (1000 * 60 * 60 * 24));

  set('c-anos',  String(anos).padStart(2, '0'));
  set('c-meses', String(meses).padStart(2, '0'));
  set('c-dias',  String(diasRestantes).padStart(2, '0'));
  set('c-horas', String(horas).padStart(2, '0'));
  set('c-min',   String(min).padStart(2, '0'));
  set('c-seg',   String(seg).padStart(2, '0'));
}

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

atualizarContador();
setInterval(atualizarContador, 1000);

/* ---- Lightbox da galeria ---- */

const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lb-img');
const lbClose    = document.getElementById('lb-close');
const galeriaItens = document.querySelectorAll('.galeria-item img');

galeriaItens.forEach(function(img) {
  img.addEventListener('click', function() {
    if (this.classList.contains('img-erro')) return;
    lbImg.src = this.src;
    lbImg.alt = this.alt;
    lightbox.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', fecharLightbox);

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) fecharLightbox();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') fecharLightbox();
});

function fecharLightbox() {
  lightbox.classList.remove('ativo');
  document.body.style.overflow = '';
  lbImg.src = '';
}

/* ---- Animação de entrada nos momentos ---- */

const momentos = document.querySelectorAll('.momento-content');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  momentos.forEach(function(el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
}
